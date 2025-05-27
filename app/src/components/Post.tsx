import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Add date-fns for timeAgo formatting
import { formatDistanceToNow } from "date-fns";

export type JobPost = {
  title: string;
  company: string;
  location: string;
  salary?: string;
  tags?: string[];
  description: string;
  applyUrl?: string;
  createdAt?: string;
};

interface JobPostCardProps {
  job: JobPost;
}

export function Post({ job }: JobPostCardProps) {
  // Compute timeAgo if createdAt is present
  const timeAgo = job.createdAt
    ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
    : undefined;

  return (
    <Card
      className="
      shadow-md bg-[var(--card)] text-[var(--card-foreground)]
      transition-colors h-[380px] flex flex-col justify-between
      hover:bg-[var(--accent)] hover:shadow-xl cursor-pointer
      max-w-[285px] w-full mx-auto
    "
    >
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-2">
          <span className="font-medium">{job.company}</span>
          <span className="text-xs text-[var(--muted-foreground)]">
            {job.location}
          </span>
        </CardDescription>
        {job.salary && (
          <div className="mt-1 text-sm font-semibold text-[var(--green-700)] dark:text-[var(--green-400)]">
            {job.salary}
          </div>
        )}
        {job.tags && job.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
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
        {/* Show timeAgo */}
        {timeAgo && (
          <div className="mt-2 text-xs text-[var(--muted-foreground)]">
            {timeAgo}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-[var(--foreground)] line-clamp-5">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        {job.applyUrl && (
          <Button
            asChild
            className="border border-[var(--border)] bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-foreground)] hover:text-[var(--accent)] transition-colors"
            aria-label={`Apply now for ${job.title} at ${job.company}`}
          >
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevents opening the modal
              aria-label={`Apply now for ${job.title} at ${job.company}`}
            >
              Apply Now
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
