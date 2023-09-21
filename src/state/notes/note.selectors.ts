import { AppState } from '../app.state';
import { NoteState } from './notes.state';
import { createSelector } from '@ngrx/store';

export const selectNotesState = (state: AppState) => state?.notes;

export const selectAllNotes = createSelector(
  selectNotesState,
  (state: NoteState) => state?.notes
);

export const selectNote = (id: string) =>
  createSelector(selectNotesState, (state: NoteState) => {
    return state?.notes[id];
  });

export const selectStatus = createSelector(
  selectNotesState,
  (state: NoteState) => state?.status
);
