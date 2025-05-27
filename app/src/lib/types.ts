export type JobData = {
  id: string;
  job_title: string;
  job_description: string;
  company_name: string;
  required_location: string[];
  created_at: string;
  salary_min?: string;
  salary_max?: string;
  apply_url?: string;
  url?: string;
};