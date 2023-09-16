import { createReducer, on } from '@ngrx/store';

import { NoteState } from './notes.state';
import {
  noteActions
} from './note.actions';

export const initialState: NoteState = {
  notes: [],
  error: null,
  status: 'pending',
};

export const noteReducer = createReducer(
  initialState,

  // GET NOTES
  on(noteActions.loadNotes, (state) => ({ ...state, status: 'loading' })),
  on(noteActions.loadNotesSuccess, (state, { notes }) => {
    debugger;
    state = {
      ...state,
      notes: notes,
    };

    const updatedNotes = state.notes.map((item) => {
      return {
        ...item,
        isSelected: false,
      };
    });

    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: 'success',
    };
  }),
  on(noteActions.loadNotesFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // UPDATE NOTE
  on(noteActions.updateNote, (state) => ({ ...state, status: 'loading' })),
  on(noteActions.updateNoteSuccess, (state, { note }) => {
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
  on(noteActions.updateNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // ARCHIVE NOTE
  on(noteActions.archiveNote, (state) => ({ ...state, status: 'loading' })),
  on(noteActions.archiveNoteSuccess, (state, { note }) => {
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
  on(noteActions.archiveNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // POST NOTE
  on(noteActions.postNote, (state) => ({ ...state, status: 'loading' })),
  on(noteActions.postNoteSuccess, (state, { note }) => {
    return {
      ...state,
      notes: [note, ...state.notes],
      error: null,
      status: 'success',
    };
  }),
  on(noteActions.postNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // SELECT NOTE
  on(noteActions.selectNote, (state) => ({ ...state, status: 'loading' })),
  on(noteActions.selectNoteSuccess, (state, { note }) => {
    const updatedNotes = state.notes.map((item) => {
      if (item?._id === note?._id) {
        item = {
          ...item,
          ...note,
        };
      } else {
        item = {
          ...item,
        };
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
  on(noteActions.selectNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
