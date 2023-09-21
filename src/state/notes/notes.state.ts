import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';

export interface NoteState {
  notes: Record<string, INoteResponse>;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}
