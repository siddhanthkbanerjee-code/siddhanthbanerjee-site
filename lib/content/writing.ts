export type Writing = {
  slug: string;
  title: string;
  date: string;
  abstract: string;
  body: string;
  category?: 'essay' | 'note';
};

export const writingEntries: Writing[] = [];
