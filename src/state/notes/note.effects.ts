import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  from,
  map,
  of,
  pipe,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { NoteService } from '@services/note.service';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
import { AppState } from '../app.state';
import { noteActions } from './note.actions';
import { selectAllNotes } from './note.selectors';

@Injectable()
export class NoteEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _noteService: NoteService,
    private readonly _store: Store<AppState>,
    private readonly _snackBar: MatSnackBar
  ) {}

  allNotes$ = this._store.select(selectAllNotes);

  loadNotes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(noteActions.loadNotes),
      withLatestFrom(this.allNotes$),
      switchMap(([action, notes]) => {
        if (!action?.isFiltered) {
          if (Object.entries(notes).length > 0) {
            return of(
              noteActions.loadNotesSuccess({
                notes: notes,
                isFiltered: action.isFiltered,
              })
            );
          }
        }
        return from(this._noteService.getNotes(action?.searchTerm)).pipe(
          map((notes) =>
            noteActions.loadNotesSuccess({
              notes: notes,
              isFiltered: action.isFiltered,
            })
          ),
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
          map((note) => {
            const updatedNote: Update<INoteResponse> = {
              id: note?._id,
              changes: { ...note },
            };

            this._snackBar.open('Note successfully updated!', 'Success', {
              panelClass: 'status__200',
            });

            return noteActions.updateNoteSuccess({ note: updatedNote });
          }),

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
          map((note) => {
            const updatedNote: Update<INoteResponse> = {
              id: note?._id,
              changes: { isArchived: true },
            };

            this._snackBar.open('Note successfully deleted!', 'Success', {
              panelClass: 'status__200',
            });

            return noteActions.archiveNoteSuccess({ note: updatedNote });
          }),
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
          map((note) => {
            this._snackBar.open('Note successfully created!', 'Success', {
              panelClass: 'status__200',
            });

            return noteActions.postNoteSuccess({ note: note });
          }),
          catchError((error) => of(noteActions.postNoteFail({ error })))
        )
      )
    )
  );

  selectNote$ = createEffect(() =>
    this._actions$.pipe(
      ofType(noteActions.selectNote),
      pipe(
        map((payload) => {
          const updatedNote: Update<INoteResponse> = {
            id: payload?.id,
            changes: { isSelected: true },
          };

          return noteActions.selectNoteSuccess({ note: updatedNote });
        }),
        catchError((error) => of(noteActions.selectNoteFail({ error })))
      )
    )
  );
}
