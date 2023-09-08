import { Injectable } from '@angular/core';
import { NoteService } from '@services/note.service';
import { switchMap, from, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadNote,
  loadNoteFail,
  loadNotes,
  loadNotesFail,
  loadNotesSuccess,
  loadNoteSuccess,
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
}
