import { createReducer, on } from '@ngrx/store';

import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
import { NoteState } from './notes.state';
import { noteActions } from './note.actions';

export const initialState: NoteState = {
  notes: {},
  error: null,
  status: 'pending',
};

export const noteReducer = createReducer(
  initialState,

  // GET NOTES
  on(noteActions.loadNotes, (state) => ({ ...state, status: 'loading' })),
  on(noteActions.loadNotesSuccess, (state, { notes }) => {
    let updatedNotes = { ...state.notes };

    for (let item of Object.keys(notes)) {
      let updatedItem = Object.assign({}, notes[item], {
        isSelected: false,
      });

      updatedNotes = {
        ...updatedNotes,
        [updatedItem._id]: { ...updatedItem },
      };
    }

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
    const updatedNotes = {
      ...state.notes,
      [note._id]: {
        ...state.notes[note._id],
        ...note,
      },
    };

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

    const updatedNotes = {
      ...state.notes,
      [note._id]: {
        ...state.notes[note._id],
        isArchived: true,
      },
    };

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
    let newNote: Record<string, INoteResponse> = {};
    newNote = {
      [note._id]: {
        ...note,
      }
    };

    const updatedNotes = {
      ...newNote,
      ...state.notes,
    };

    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: 'success',
    };
  }),
  on(noteActions.postNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
