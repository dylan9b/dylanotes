import { Injectable } from '@angular/core';
import { NoteService } from '@services/note.service';
import { switchMap, from, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

@Injectable()
export class NoteEffects {
  constructor(private actions$: Actions, private noteService: NoteService) {}

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotes),
      switchMap((notesQuery) =>
        from(this.noteService.getNotes(notesQuery?.searchTerm)).pipe(
          map((notes) => loadNotesSuccess({ notes: notes })),
          catchError((error) => of(loadNotesFail({ error })))
        )
      )
    )
  );

  loadNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNote),
      switchMap((noteQuery) =>
        from(this.noteService.getNote(noteQuery?.id)).pipe(
          map((note) => loadNoteSuccess({ note: note })),
          catchError((error) => of(loadNoteFail({ error })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNote),
      switchMap((noteQuery) =>
        from(this.noteService.putNote(noteQuery?.note)).pipe(
          map((note) => updateNoteSuccess({ note: note })),
          catchError((error) => of(updateNoteFail({ error })))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNote),
      switchMap((noteQuery) =>
        from(this.noteService.deleteNote(noteQuery?.id)).pipe(
          map((note) => deleteNoteSuccess({ note: note })),
          catchError((error) => of(deleteNoteFail({ error })))
        )
      )
    )
  );

  postNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postNote),
      switchMap((noteQuery) =>
        from(this.noteService.postNote(noteQuery?.note)).pipe(
          map((note) => postNoteSuccess({ note: note })),
          catchError((error) => of(postNoteFail({ error })))
        )
      )
    )
  );
}
