import React from "react";
import { formatDistanceToNow } from "date-fns";
import type { JobData } from "@/lib/types";

export function PostDetailModal({
  job,
  onClose,
}: {
  job: JobData | null;
  onClose: () => void;
}) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (job) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [job]);

  // Animation end handler for closing
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250); // match animation duration
  };

  // Disable body scroll when modal is open, but keep scrollbar visible
  React.useEffect(() => {
    if (show || isClosing) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflowY = "";
        window.scrollTo(0, scrollY);
      };
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
    };
  }, [show, isClosing]);

  if (!job && !isClosing) return null;

  // Compute timeAgo for modal
  const timeAgo = job?._created_at
    ? formatDistanceToNow(new Date(job._created_at), { addSuffix: true })
    : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 transition-opacity"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      style={{ transition: "background 0.2s" }}
    >
      <div
        className={`
        relative
        w-full
        max-w-2xl
        sm:max-w-3xl
        lg:max-w-4xl
        rounded-t-2xl
        shadow-lg
        bg-[var(--card)]
        text-[var(--card-foreground)]
        mx-0 sm:mx-4
        h-[80vh]
        animate-[slideUp_0.25s_ease-out]
        ${isClosing ? "animate-slideDown" : "animate-slideUp"}
      `}
        onClick={(e) => e.stopPropagation()}
        style={{
          animationDuration: "0.25s",
        }}
      >
        {/* Header: fixed at the top */}
        <div className="sticky top-0 z-10 bg-[var(--card)] rounded-t-2xl px-6 pt-6 pb-2">
          <button
            className="absolute top-4 right-4 text-2xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors z-10"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-1">{job?.job_title}</h2>
          <div className="mb-2 text-[var(--muted-foreground)]">
            {job?.company_name} &mdash;{" "}
            {Array.isArray(job?.required_location)
              ? job.required_location.join(", ")
              : job?.required_location}
          </div>
          <div className="mb-2 font-semibold text-green-700 dark:text-green-400">
            {job?.salary_min && job?.salary_max
              ? `${job.salary_min}–${job.salary_max}`
              : job?.salary_min
              ? job.salary_min
              : job?.salary_max
              ? job.salary_max
              : null}
          </div>
          {timeAgo && (
            <div className="mb-2 text-xs text-[var(--muted-foreground)]">
              Posted {timeAgo}
            </div>
          )}
        </div>
        {/* Scrollable content */}
        <div
          className="overflow-y-auto px-6 pb-4"
          style={{ maxHeight: "calc(80vh - 112px)" }} // 112px = header height (adjust if needed)
        >
          <div
            className="prose prose-sm max-w-none dark:prose-invert mb-4"
            dangerouslySetInnerHTML={{ __html: job?.description || "" }}
          />
          {job?.tags && job.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-[var(--muted)] text-xs text-[var(--muted-foreground)] border border-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {job?.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded border border-[var(--border)] bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-foreground)] hover:text-[var(--accent)] font-semibold transition-colors mb-4 mt-4"
            >
              Apply Now
            </a>
          )}
        </div>
      </div>
      <style>
        {`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0.7; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0.7; }
        }
        .animate-slideUp {
          animation: slideUp 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-slideDown {
          animation: slideDown 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}
      </style>
    </div>
  );
}
