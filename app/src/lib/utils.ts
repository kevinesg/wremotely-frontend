import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { JobData } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  const plainDescription = truncate(stripHtml(job.job_description), 280);
  return {
    title: job.job_title,
    company: job.company_name,
    location: job.required_location?.join(", ") || "",
    salary:
      job.salary_min && job.salary_max
        ? `$${job.salary_min}–$${job.salary_max}`
        : job.salary_min
        ? `$${job.salary_min}+`
        : undefined,
    description: plainDescription,
    applyUrl: job.apply_url || job.url,
    createdAt: job.created_at,
  };
}