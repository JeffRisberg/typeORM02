export interface Book {
  id?: number;
  title: string;
  publication_date: string;
  page_count: number;
  author_id: number;
  created_at?: string;
  updated_at?: string;
}
