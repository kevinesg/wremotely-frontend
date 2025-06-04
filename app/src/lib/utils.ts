import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { JobData } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function stripHtml(html: string): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function mapJobToPost(job: JobData) {
  const plainDescription = truncate(stripHtml(job.description), 280);

  // Salary logic: show as range if both, else just min or max (no $ sign, no hyphen if only min)
  let salary: string | undefined;
  if (job.salary_min && job.salary_max) {
    salary = `${job.salary_min} – ${job.salary_max}`;
  } else if (job.salary_min) {
    salary = job.salary_min;
  } else if (job.salary_max) {
    salary = job.salary_max;
  }

  // Fix tags: remove brackets and split by comma
  let tags: string[] = [];
  if (Array.isArray(job.tags)) {
    tags = job.tags;
  } else if (typeof job.tags === "string" && job.tags) {
    let tagStr: string = job.tags;
    if (
      tagStr.startsWith("{") &&
      tagStr.endsWith("}")
    ) {
      tagStr = tagStr.slice(1, -1);
    }
    tags = tagStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  return {
    title: job.job_title,
    company: job.company_name,
    location: Array.isArray(job.required_location)
      ? job.required_location.join(", ")
      : job.required_location || "",
    salary,
    tags,
    description: plainDescription,
    applyUrl: job.apply_url || job.url,
    createdAt: job._created_at,
  };
}