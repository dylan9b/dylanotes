import { Injectable } from '@angular/core';
import { NoteService } from '@services/note.service';
import { switchMap, from, map, catchError, of, delay } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  archiveNote,
  archiveNoteFail,
  archiveNoteSuccess,
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
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAllNotes } from './note.selectors';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private noteService: NoteService,
    private _store: Store<AppState>
  ) {}

  allNotes$ = this._store.select(selectAllNotes);

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

  archiveNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(archiveNote),
      switchMap((noteQuery) =>
        from(this.noteService.archiveNote(noteQuery?.id)).pipe(
          map((note) => archiveNoteSuccess({ note: note })),
          catchError((error) => of(archiveNoteFail({ error })))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      // the delay must be the same as the animation we have :)
      delay(150),
      ofType(archiveNoteSuccess),
      map((note) => deleteNoteSuccess(note))
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
