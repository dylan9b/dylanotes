import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { notesAdapter } from './notes.adapter';
import { NoteState } from './notes.state';

export const selectNotesState = (state: AppState) => state?.notes;

const { selectAll, selectTotal } = notesAdapter.getSelectors();

export const selectAllNotes = createSelector(selectNotesState, selectAll);
export const selectNotesTotal = createSelector(selectNotesState, selectTotal);

export const selectNote = (id: string) =>
  createSelector(selectNotesState, (state: NoteState) => {
    return state?.entities[id] || null;
  });

export const selectStatus = createSelector(
  selectNotesState,
  (state: NoteState) => state?.status
);
