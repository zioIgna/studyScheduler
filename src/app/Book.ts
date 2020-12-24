export interface Book {
  id: string;
  titolo: string;
  autore: string;
  pagine: number;
  note?: string;
  isArchived?: boolean
}
