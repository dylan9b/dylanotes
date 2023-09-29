import { EntityState } from '@ngrx/entity';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';

export interface NoteState extends EntityState<INoteResponse> {
  error: string | null;
  status: string;
  isFiltered: boolean;
  searchTerm: string | null;
}
