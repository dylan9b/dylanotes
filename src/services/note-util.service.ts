import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { INoteRequest } from 'src/app/notes/item/_models/note-request.model';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
import { AppState } from 'src/state/app.state';
import { noteActions } from 'src/state/notes/note.actions';

@Injectable({
  providedIn: 'root',
})
export class NoteUtilService {
  constructor(private readonly _store: Store<AppState>) {}

  /**
   * Pins/unpins a note.
   *
   * @param note - The note to pin.
   */
  pinNote(note: INoteResponse): void {
    if (note) {
      let updatedNote = {} as INoteRequest;
      updatedNote = {
        ...updatedNote,
        _id: note?._id,
        isPinned: !note?.isPinned,
      };

      this._store.dispatch(noteActions.updateNote({ note: updatedNote }));
    }
  }

  /**
   * Completes/unCompletes a note.
   *
   * @param note - The note to complete.
   */
  completeNote(note: INoteResponse): void {
    if (note) {
      let updatedNote = {} as INoteRequest;
      updatedNote = {
        ...updatedNote,
        _id: note?._id,
        isComplete: !note?.isComplete,
      };

      this._store.dispatch(noteActions.updateNote({ note: updatedNote }));
    }
  }
}
