import { createAction, props } from '@ngrx/store';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';

export const noteKey = '[NOTES]';

export const loadNotes = createAction(
  `${noteKey} Load Notes`,
  props<{ searchTerm: string }>()
);
export const loadNotesSuccess = createAction(
  `${noteKey} Load Notes: Success`,
  props<{ notes: INoteResponse[] }>()
);
export const loadNotesFail = createAction(
  `${noteKey} Load Notes: Fail`,
  props<{ error: string }>()
);

export const loadNote = createAction(
  `${noteKey} Load Note`,
  props<{ id: string }>()
);
export const loadNoteSuccess = createAction(
  `${noteKey} Load Note: Success`,
  props<{ note: INoteResponse }>()
);
export const loadNoteFail = createAction(
  `${noteKey} Load Note: Fail`,
  props<{ error: string }>()
);
