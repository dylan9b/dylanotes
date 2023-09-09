import { NoteState } from './notes.state';
import { createReducer, on } from '@ngrx/store';
import {
  deleteNote,
  deleteNoteFail,
  deleteNoteSuccess,
  loadNote,
  loadNoteFail,
  loadNotes,
  loadNotesFail,
  loadNotesSuccess,
  loadNoteSuccess,
  postNote,
  postNoteFail,
  postNoteSuccess,
  updateNote,
  updateNoteFail,
  updateNoteSuccess,
} from './note.actions';

export const initialState: NoteState = {
  notes: [],
  note: null,
  error: null,
  status: 'pending',
};

export const noteReducer = createReducer(
  initialState,

  // GET NOTES
  on(loadNotes, (state) => ({ ...state, status: 'loading' })),
  on(loadNotesSuccess, (state, { notes }) => ({
    ...state,
    notes: notes,
    error: null,
    status: 'success',
  })),
  on(loadNotesFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // GET NOTE
  on(loadNote, (state) => ({ ...state, status: 'loading' })),
  on(loadNoteSuccess, (state, { note }) => ({
    ...state,
    note: note,
    error: null,
    status: 'success',
  })),
  on(loadNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // UPDATE NOTE
  on(updateNote, (state) => ({ ...state, status: 'loading' })),
  on(updateNoteSuccess, (state, { note }) => {
    const updatedNotes = state.notes.map((el) => {
      if (el._id === note?._id) {
        return Object.assign({}, el, {
          isPinned: note?.isPinned,
          isComplete: note?.isComplete,
        });
      }
      return el;
    });

    return {
      ...state,
      notes: updatedNotes,
      note: note,
      error: null,
      status: 'success',
    };
  }),
  on(updateNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // DELETE NOTE
  on(deleteNote, (state) => ({ ...state, status: 'loading' })),
  on(deleteNoteSuccess, (state, { note }) => {
    const updatedNotes = state.notes.filter((item) => item._id !== note?._id);
    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: 'success',
    };
  }),
  on(deleteNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // POST NOTE
  on(postNote, (state) => ({ ...state, status: 'loading' })),
  on(postNoteSuccess, (state, { note }) => {
    return {
      ...state,
      notes: [note, ...state.notes],
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
