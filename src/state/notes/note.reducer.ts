import { NoteState } from './notes.state';
import { createReducer, on } from '@ngrx/store';
import {
  archiveNote,
  archiveNoteFail,
  archiveNoteSuccess,
  loadNotes,
  loadNotesFail,
  loadNotesSuccess,
  postNote,
  postNoteFail,
  postNoteSuccess,
  updateNote,
  updateNoteFail,
  updateNoteSuccess,
} from './note.actions';

export const initialState: NoteState = {
  notes: [],
  error: null,
  status: 'pending',
};

export const noteReducer = createReducer(
  initialState,

  // GET NOTES
  on(loadNotes, (state) => ({ ...state, status: 'loading' })),
  on(loadNotesSuccess, (state, { notes }) => {
    return {
      ...state,
      notes: notes,
      error: null,
      status: 'success',
    };
  }),
  on(loadNotesFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // GET NOTE
  // on(loadNote, (state) => ({ ...state, status: 'loading' })),
  // on(loadNoteSuccess, (state, { note }) => ({
  //   ...state,
  //   error: null,
  //   status: 'success',
  // })),
  // on(loadNoteFail, (state, { error }) => ({
  //   ...state,
  //   error: error,
  //   status: 'error',
  // })),

  // UPDATE NOTE
  on(updateNote, (state) => ({ ...state, status: 'loading' })),
  on(updateNoteSuccess, (state, { note }) => {
    const updatedNotes = state.notes.map((item) => {
      if (item?._id === note?._id) {
        item = { ...note };
        return item;
      }
      return item;
    });

    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: 'success',
    };
  }),
  on(updateNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // ARCHIVE NOTE
  on(archiveNote, (state) => ({ ...state, status: 'loading' })),
  on(archiveNoteSuccess, (state, { note }) => {
    note = {
      ...note,
      isArchived: true,
    };

    const updatedNotes = state.notes.map((item) => {
      if (item?._id === note?._id) {
        item = { ...item, isArchived: true };
        return item;
      }
      return item;
    });

    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: 'success',
    };
  }),
  on(archiveNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // POST NOTE
  on(postNote, (state) => ({ ...state, status: 'loading' })),
  on(postNoteSuccess, (state, { note }) => {
    return {
      ...state,
      notes: { ...note, ...state.notes },
      error: null,
      status: 'success',
    };
  }),
  on(postNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
