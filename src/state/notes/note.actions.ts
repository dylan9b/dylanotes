import { createAction, props } from '@ngrx/store';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
import { INoteRequest } from 'src/app/notes/item/_models/note-request.model';

export const noteKey = '[NOTES]';

// GET NOTES
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

// GET NOTE
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

// UPDATE NOTE
export const updateNote = createAction(
  `${noteKey} Update Note`,
  props<{ note: INoteRequest }>()
);
export const updateNoteSuccess = createAction(
  `${noteKey} Update Note: Success`,
  props<{ note: INoteResponse }>()
);
export const updateNoteFail = createAction(
  `${noteKey} Update Note: Fail`,
  props<{ error: string }>()
);

// DELETE NOTE
export const deleteNote = createAction(
  `${noteKey} Delete Note`,
  props<{ id: string }>()
);
export const deleteNoteSuccess = createAction(
  `${noteKey} Delete Note: Success`,
  props<{ note: INoteResponse }>()
);
export const deleteNoteFail = createAction(
  `${noteKey} Delete Note: Fail`,
  props<{ error: string }>()
);

// POST NOTE
export const postNote = createAction(
  `${noteKey} Post Note`,
  props<{ note: INoteResponse }>()
);
export const postNoteSuccess = createAction(
  `${noteKey} Post Note: Success`,
  props<{ note: INoteResponse }>()
);
export const postNoteFail = createAction(
  `${noteKey} Post Note: Fail`,
  props<{ error: string }>()
);
