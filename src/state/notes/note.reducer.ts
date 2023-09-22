import { createReducer, on } from '@ngrx/store';

import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
import { STATUS } from '../cta/cta.state';
import { noteActions } from './note.actions';
import { NoteState } from './notes.state';

export const initialState: NoteState = {
  notes: {},
  error: null,
  status: STATUS.ERROR,
  isFiltered: false,
};

export const noteReducer = createReducer(
  initialState,

  // GET NOTES
  on(noteActions.loadNotes, (state) => ({
    ...state,
    status: STATUS.LOADING,
    isFiltered: state.isFiltered,
  })),
  on(noteActions.loadNotesSuccess, (state, { notes, isFiltered }) => {
    let updatedNotes = {};

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
      isFiltered,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(noteActions.loadNotesFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  })),

  // UPDATE NOTE
  on(noteActions.updateNote, (state) => ({ ...state,     status: STATUS.LOADING  })),
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
      status: STATUS.SUCCESS,
    };
  }),
  on(noteActions.updateNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  })),

  // ARCHIVE NOTE
  on(noteActions.archiveNote, (state) => ({ ...state, status: STATUS.LOADING })),
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
      status: STATUS.SUCCESS,
    };
  }),
  on(noteActions.archiveNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  })),

  // POST NOTE
  on(noteActions.postNote, (state) => ({ ...state, status: STATUS.LOADING })),
  on(noteActions.postNoteSuccess, (state, { note }) => {
    let newNote: Record<string, INoteResponse> = {};
    newNote = {
      [note._id]: {
        ...note,
      },
    };

    const updatedNotes = {
      ...newNote,
      ...state.notes,
    };

    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(noteActions.postNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  })),

  // SELECT NOTE
  on(noteActions.selectNote, (state) => ({ ...state, status: STATUS.LOADING })),
  on(noteActions.selectNoteSuccess, (state, { note }) => {
    const updatedNotes = {
      ...state.notes,
      [note._id]: {
        ...state.notes[note._id],
        isSelected: true,
      },
    };

    return {
      ...state,
      notes: updatedNotes,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(noteActions.selectNoteFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  }))
);
