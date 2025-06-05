import { PostDetailModal } from "@/components/PostDetailModal";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { mapJobToPost } from "@/lib/utils";
import type { JobData } from "@/lib/types";
import { Post } from "@/components/Post";
import Fuse from "fuse.js";
import axios from "axios";

const PAGE_SIZE = 12;

interface PostCollectionProps {
  search?: string;
}

export function PostCollection({ search = "" }: PostCollectionProps) {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<JobData | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch jobs from FastAPI backend
  useEffect(() => {
    setLoading(true);
    const params = search.trim() ? { q: search.trim() } : {};
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL || "https://api.wremotely.com"
        }/remote_jobs/`,
        { params }
      )
      .then((res) => {
        const data = (res.data.jobs ?? res.data) as JobData[];
        data.sort(
          (a: JobData, b: JobData) =>
            new Date(b._created_at).getTime() -
            new Date(a._created_at).getTime()
        );
        setJobs(data);
      })
      .catch((_err) => {
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, [search]);

  // Set up Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(jobs, {
        keys: ["job_title", "company_name", "tags"],
        threshold: 0.4,
        includeScore: true,
      }),
    [jobs]
  );

  // Fuzzy search and sort by relevance (Fuse.js score)
  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs;
    return fuse.search(search).map((result) => result.item);
  }, [jobs, search, fuse]);

  // Intersection Observer logic
  const loadMore = useCallback(() => {
    if (visibleCount < filteredJobs.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((v) => Math.min(v + PAGE_SIZE, filteredJobs.length));
        setIsLoadingMore(false);
      }, 300);
    }
  }, [visibleCount, filteredJobs.length]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (visibleCount >= filteredJobs.length) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, isLoadingMore, visibleCount, filteredJobs.length]);

  if (loading) {
    return (
      <div className="text-center py-10 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 max-w-screen-xl w-full">
          {filteredJobs.slice(0, visibleCount).map((job) => (
            <button
              key={job.id}
              onClick={() => setSelected(job)}
              className="text-left focus-visible:outline-none hover:shadow-lg transition-shadow"
              aria-label={`Open ${job.job_title} details`}
            >
              <Post
                job={{
                  ...mapJobToPost(job),
                  createdAt: job._created_at,
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <div ref={sentinelRef} className="h-4"></div>
      {isLoadingMore && (
        <div className="flex justify-center my-6 text-sm text-muted-foreground">
          Loading more jobs...
        </div>
      )}
      <PostDetailModal job={selected} onClose={() => setSelected(null)} />
    </>
  );
}
