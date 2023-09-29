import { createReducer, on } from '@ngrx/store';

import { STATUS } from '../cta/cta.state';
import { noteActions } from './note.actions';
import { notesAdapter } from './notes.adapter';
import { NoteState } from './notes.state';

export const initialState: NoteState = notesAdapter.getInitialState({
  error: null,
  status: STATUS.ERROR,
  isFiltered: false,
  searchTerm: null,
});

export const noteReducer = createReducer(
  initialState,

  // GET NOTES
  on(noteActions.loadNotes, (state, { searchTerm, isFiltered }) => ({
    ...state,
    status: STATUS.LOADING,
    isFiltered,
    searchTerm,
  })),
  on(noteActions.loadNotesSuccess, (state, { notes, isFiltered }) => {
    let updatedNotes = notesAdapter.removeAll(state);

    let updatedState = {
      ...state,
      ...updatedNotes,
    };

    updatedNotes = notesAdapter.setMany(
      notes?.map((note) => {
        return { ...note, isSelected: false };
      }),
      updatedState
    );

    updatedState = {
      ...state,
      ...updatedNotes,
      isFiltered,
      error: null,
      status: STATUS.SUCCESS,
    };

    return updatedState;
  }),
  on(noteActions.loadNotesFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  })),

  // UPDATE NOTE
  on(noteActions.updateNote, (state) => ({ ...state, status: STATUS.LOADING })),
  on(noteActions.updateNoteSuccess, (state, { note }) => {
    return {
      ...state,
      ...notesAdapter.updateOne(note, state),
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
  on(noteActions.archiveNote, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(noteActions.archiveNoteSuccess, (state, { note }) => {
    return {
      ...state,
      ...notesAdapter.updateOne(note, state),
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
    return {
      ...state,
      ...notesAdapter.addOne(note, state),
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
    return {
      ...state,
      ...notesAdapter.updateOne(note, state),
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
