import { NoteState } from './notes.state';
import { createReducer, on } from '@ngrx/store';
import {
  loadNote,
  loadNoteFail,
  loadNotes,
  loadNotesFail,
  loadNotesSuccess,
  loadNoteSuccess,
} from './note.actions';

export const initialState: NoteState = {
  notes: [],
  note: null,
  error: null,
  status: 'pending',
};

export const noteReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array
  // on(addTodo, (state, { content }) => ({
  //   ...state,
  //   todos: [...state.todos, { id: Date.now().toString(), content: content }],
  // })),
  // // Remove the todo from the todos array
  // on(removeTodo, (state, { id }) => ({
  //   ...state,
  //   todos: state.todos.filter((todo) => todo.id !== id),
  // })),

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
  }))
);
