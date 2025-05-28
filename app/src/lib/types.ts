export type JobData = {
  id: string;
  job_title: string;
  description: string;
  company_name: string;
  required_location: string[] | string; // Accepts array or string for flexibility
  _created_at: string;
  salary_min?: string | null; // Allow null as well as string
  salary_max?: string | null; // Allow null as well as string
  apply_url?: string;
  url?: string;
  tags?: string[]; // Add tags if present in your data
};