import { createAction, props } from '@ngrx/store';

import { INoteRequest } from 'src/app/notes/item/_models/note-request.model';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';

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

// SELCT NOTE
export const selectNote = createAction(
  `${noteKey} Select Note`,
  props<{ note: INoteResponse }>()
);
export const selectNoteSuccess = createAction(
  `${noteKey} Select Note: Success`,
  props<{ note: INoteResponse }>()
);
export const selectNoteFail = createAction(
  `${noteKey} Select Note: Fail`,
  props<{ error: string }>()
);
