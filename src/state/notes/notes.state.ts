import { INoteResponse } from '../../app/notes/item/_models/note-response.model';

export interface NoteState {
  notes: INoteResponse[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}