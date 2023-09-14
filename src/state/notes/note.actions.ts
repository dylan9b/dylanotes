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

// UPDATE NOTE - ITEM
export const updateNoteInList = createAction(
  `${noteKey} Update Note in List`,
  props<{ note: INoteRequest }>()
);
export const updateNoteInListSuccess = createAction(
  `${noteKey} Update Note in List: Success`,
  props<{ notes: INoteResponse[] }>()
);
export const updateNoteInListFail = createAction(
  `${noteKey} Update Note in List: Fail`,
  props<{ error: string }>()
);

// UPDATE NOTE - LIST
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

// ARCHIVE NOTE
export const archiveNote = createAction(
  `${noteKey} Archive Note`,
  props<{ id: string }>()
);
export const archiveNoteSuccess = createAction(
  `${noteKey} Archive Note: Success`,
  props<{ note: INoteResponse }>()
);
export const archiveNoteFail = createAction(
  `${noteKey} Archive Note: Fail`,
  props<{ error: string }>()
);

// DELETE NOTE FROM LIST
export const deleteNoteSuccess = createAction(
  `${noteKey} Delete Note: Success`,
  props<{ note: INoteResponse }>()
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
