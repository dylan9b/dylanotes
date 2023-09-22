import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NoteUtilService } from '@services/note-util.service';
import { map } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { AppState } from 'src/state/app.state';
import { ctaActions } from 'src/state/cta/cta.actions';
import { selectCta } from 'src/state/cta/cta.selectors';
import { CTAResponse } from 'src/state/cta/cta.state';
import { noteActions } from 'src/state/notes/note.actions';
import { selectAllNotes } from 'src/state/notes/note.selectors';
import { selectStatus } from '../../../state/notes/note.selectors';
import { INoteResponse } from '../item/_models/note-response.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    Animations.pinUnpin,
    Animations.completeIncomplete,
    Animations.delete,
    Animations.selectNote,
    Animations.cta,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotesListComponent implements OnInit {
  allNotes$ = this._store
    .select(selectAllNotes)
    .pipe(map((data) => Object.values(data)));
  status$ = this._store.select(selectStatus);
  cta$ = this._store.select(selectCta);

  noteSteps = NotesStep;
  isEmptyResult: boolean = false;
  isLoading: boolean = false;
  destroyRef = inject(DestroyRef);

  isAddNoteClicked: boolean = false;

  constructor(
    private _store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private _noteUtilService: NoteUtilService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._store.dispatch(
      noteActions.loadNotes({ searchTerm: '', isFiltered: false })
    );
    this._store.dispatch(ctaActions.loadCTA());
  }

  /**
   * Retrieves the list of notes based on a search term.
   *
   * @param input - The search term.
   */
  searchNotes(input: Event): void {
    const searchTerm = (input?.target as HTMLInputElement)?.value || '';
    this._store.dispatch(
      noteActions.loadNotes({ searchTerm, isFiltered: true })
    );
  }

  /**
   * Remove a note by its id.
   *
   * @param id - The note id.
   */
  removeNote(id: string): void {
    this._store.dispatch(noteActions.archiveNote({ id }));

    this._snackBar.open('Note successfully deleted!', 'Success', {
      panelClass: 'status__200',
    });
  }

  /**
   * On clicking a note, updated its 'isSelected' property.
   *
   * @param note - The clicked note.
   * @param status - The note state.
   */
  onNoteItemClick(note: INoteResponse, status: string): void {
    if (status !== 'loading') {
      note = {
        ...note,
        isSelected: true,
      };

      this._store.dispatch(noteActions.selectNote({ note: note }));
    }
  }

  /**
   * On ending the animation, redirect the user to the note item page.
   *
   * @param note - The selected note.
   */
  onSelectNoteAnimationEnd(note: INoteResponse): void {
    if (note?.isSelected) {
      this._router.navigate(['/notes', note?._id]);
    }
  }

  onSearchNote(): void {
    let cta = {} as CTAResponse;
    cta = { ...cta, action: 'search' };

    this._store.dispatch(ctaActions.updateCTA({ cta }));
  }

  onAddNote(): void {
    this.isAddNoteClicked = true;
    let cta = {} as CTAResponse;
    cta = { ...cta, action: 'add' };

    this._store.dispatch(ctaActions.updateCTA({ cta }));
  }

  onAddNoteAnimationEnd(cta: CTAResponse): void {
    if (cta.action === 'add') {
      this._router.navigate(['/notes', 'new']);
      this.isAddNoteClicked = !this.isAddNoteClicked;
    }
  }

  /**
   * Pin a note by its id.
   *
   * @param note - The note to pin.
   */
  pinNote(note: INoteResponse): void {
    this._noteUtilService.pinNote(note);
  }

  /**
   * Mark a note as complete.
   *
   * @param note - The note to complete.
   */
  completeNote(note: INoteResponse): void {
    this._noteUtilService.completeNote(note);
  }

  /**
   * Tracking note function to be used in the for loop.
   *
   * @param index - The index position ofthe note.
   * @param note - The actual note.
   * @returns { string } - The note id.
   */
  noteTrackByFn(index: number, note: INoteResponse): string {
    return note?._id;
  }
}
