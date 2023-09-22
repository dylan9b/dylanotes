import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, pipe, switchMap, withLatestFrom } from 'rxjs';
import { selectAllNotes } from './note.selectors';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoteService } from '@services/note.service';
import { AppState } from '../app.state';
import { noteActions } from './note.actions';

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
      ofType(noteActions.loadNotes),
      withLatestFrom(this.allNotes$),
      switchMap(([action, notes]) => {
        if (!action?.isFiltered) {
          if (Object.entries(notes).length > 0) {
            return of(noteActions.loadNotesSuccess({ notes: notes, isFiltered: action.isFiltered }));
          }
        }
        return from(this._noteService.getNotes(action?.searchTerm)).pipe(
          map((notes) => noteActions.loadNotesSuccess({ notes: notes, isFiltered: action.isFiltered })),
          catchError((error) => of(noteActions.loadNotesFail({ error })))
        );
      })
    )
  );

  updateNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(noteActions.updateNote),
      switchMap((noteQuery) =>
        from(this._noteService.putNote(noteQuery?.note)).pipe(
          map((note) =>
            noteActions.updateNoteSuccess({
              note: { ...note, ...noteQuery?.note },
            })
          ),
          catchError((error) => of(noteActions.updateNoteFail({ error })))
        )
      )
    )
  );

  archiveNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(noteActions.archiveNote),
      switchMap((noteQuery) =>
        from(this._noteService.archiveNote(noteQuery?.id)).pipe(
          map((note) => noteActions.archiveNoteSuccess({ note: note })),
          catchError((error) => of(noteActions.archiveNoteFail({ error })))
        )
      )
    )
  );

  postNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(noteActions.postNote),
      switchMap((noteQuery) =>
        from(this._noteService.postNote(noteQuery?.note)).pipe(
          map((note) => noteActions.postNoteSuccess({ note: note })),
          catchError((error) => of(noteActions.postNoteFail({ error })))
        )
      )
    )
  );

  selectNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(noteActions.selectNote),
      pipe(
        map((note) => noteActions.selectNoteSuccess({ note: note?.note })),
        catchError((error) => of(noteActions.selectNoteFail({ error })))
      )
    )
  );
}
