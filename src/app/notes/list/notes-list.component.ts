import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { INoteResponse } from '../item/_models/note-response.model';
import { INoteRequest } from '../item/_models/note-request.model';
import { Animations } from 'src/app/animations/animations';
import { selectAllNotes } from 'src/state/notes/note.selectors';
import { Store } from '@ngrx/store';
import {
  archiveNote,
  loadNotes,
  updateNote,
} from 'src/state/notes/note.actions';
import { AppState } from 'src/state/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NoteItem } from '../item/_models/note-item.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    Animations.pinUnpin,
    Animations.completeIncomplete,
    Animations.delete,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotesListComponent implements OnInit {
  allNotes$ = this._store.select(selectAllNotes);

  noteSteps = NotesStep;
  isEmptyResult: boolean = false;
  isLoading: boolean = false;
  notes!: INoteResponse[];
  destroyRef = inject(DestroyRef);

  constructor(
    private _store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._store.dispatch(loadNotes({ searchTerm: '' }));

    this.allNotes$
      // .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((notes) => (this.notes = notes));
  }

  searchNotes(input: Event): void {
    const searchTerm = (input?.target as HTMLInputElement)?.value || '';

    this._store.dispatch(loadNotes({ searchTerm }));

    this.allNotes$.subscribe((notes) => (this.notes = notes));
  }

  /**
   * Remove a note by its id.
   *
   * @param id - The note id.
   */
  removeNote(id: string): void {
    this._store.dispatch(archiveNote({ id }));

    this._snackBar.open('Note successfully deleted!', 'Success', {
      panelClass: 'status__200',
    });
  }

  /**
   * Pin a note by its id.
   *
   * @param note - The note to pin.
   */
  pinNote(note: INoteResponse): void {
    let updatedNote = {} as INoteRequest;
    updatedNote = {
      ...updatedNote,
      _id: note?._id,
      isPinned: !note?.isPinned,
    };

    this._store.dispatch(updateNote({ note: updatedNote }));
  }

  /**
   * Mark a note as complete.
   *
   * @param note - The note to complete.
   */
  completeNote(note: INoteResponse): void {
    let updatedNote = {} as INoteRequest;
    updatedNote = {
      ...updatedNote,
      _id: note?._id,
      isComplete: !note?.isComplete,
    };

    this._store.dispatch(updateNote({ note: updatedNote }));
  }

  noteTrackByFn(index: number, note: INoteResponse): string {
    return note?._id;
  }
}
