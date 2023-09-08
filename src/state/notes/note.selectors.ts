import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { NoteState } from './notes.state';

export const selectNotesState = (state: AppState) => state?.notes;

export const selectAllNotes = createSelector(
  selectNotesState,
  (state: NoteState) => state?.notes
);

export const selectNote = createSelector(
  selectNotesState,
  (state: NoteState) => state?.note
)