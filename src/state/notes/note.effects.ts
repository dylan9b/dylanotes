import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  selectNote,
  selectNoteFail,
  selectNoteSuccess,
  updateNote,
  updateNoteFail,
  updateNoteSuccess
} from './note.actions';
import {
  catchError,
  from,
  map,
  of,
  pipe,
  switchMap,
  withLatestFrom
} from 'rxjs';

import { AppState } from '../app.state';
import { Injectable } from '@angular/core';
import { NoteService } from '@services/note.service';
import { Store } from '@ngrx/store';
import { selectAllNotes } from './note.selectors';

@Injectable()
export class NoteEffects {
  constructor(
    private _actions$: Actions,
    private _noteService: NoteService,
    private _store: Store<AppState>
  ) {}

  allNotes$ = this._store.select(selectAllNotes);

  loadNotes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadNotes),
      withLatestFrom(this.allNotes$),
      switchMap(([action, notes]) => {
        if (notes?.length) {
          return of(loadNotesSuccess({ notes: notes }));
        }
        return from(this._noteService.getNotes(action?.searchTerm)).pipe(
          map((notes) => loadNotesSuccess({ notes: notes })),
          catchError((error) => of(loadNotesFail({ error })))
        );
      })
    )
  );

  updateNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateNote),
      switchMap((noteQuery) =>
        from(this._noteService.putNote(noteQuery?.note)).pipe(
          map((note) => updateNoteSuccess({ note: note })),
          catchError((error) => of(updateNoteFail({ error })))
        )
      )
    )
  );

  archiveNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(archiveNote),
      switchMap((noteQuery) =>
        from(this._noteService.archiveNote(noteQuery?.id)).pipe(
          map((note) => archiveNoteSuccess({ note: note })),
          catchError((error) => of(archiveNoteFail({ error })))
        )
      )
    )
  );

  postNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postNote),
      switchMap((noteQuery) =>
        from(this._noteService.postNote(noteQuery?.note)).pipe(
          map((note) => postNoteSuccess({ note: note })),
          catchError((error) => of(postNoteFail({ error })))
        )
      )
    )
  );

  selectNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(selectNote),
      pipe(
        map((note) => selectNoteSuccess({ note: note?.note })),
        catchError((error) => of(selectNoteFail({ error })))
      )
      // switchMap((note) =>
      //   from(of(note.note)).pipe(
      //     map((note) => postNoteSuccess({ note: note })),
      //     catchError((error) => of(postNoteFail({ error })))
      //   )
      // )
    )
  );
}
