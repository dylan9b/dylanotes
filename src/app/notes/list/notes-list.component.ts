import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CTA_ACTION_STATES, STATUS } from 'src/state/cta/cta.state';
import {
  selectAllNotes,
  selectIsFiltered,
  selectNotesTotal,
} from 'src/state/notes/note.selectors';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NoteUtilService } from '@services/note-util.service';
import { take } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { AppState } from 'src/state/app.state';
import { ctaActions } from 'src/state/cta/cta.actions';
import { selectCta } from 'src/state/cta/cta.selectors';
import { noteActions } from 'src/state/notes/note.actions';
import { selectStatus } from '../../../state/notes/note.selectors';
import { INoteResponse } from '../item/_models/note-response.model';
import { NoteSearchComponent } from '../search/note-search.component';

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
    Animations.listAnimation,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotesListComponent implements OnInit {
  allNotes$ = this._store.select(selectAllNotes);
  totalNumOfNotes$ = this._store.select(selectNotesTotal);
  areNotesFiltered$ = this._store.select(selectIsFiltered);
  
  status$ = this._store.select(selectStatus);
  cta$ = this._store.select(selectCta);

  noteSteps = NotesStep;
  isEmptyResult: boolean = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _noteUtilService: NoteUtilService,
    private readonly _router: Router,
    private readonly _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this._store.dispatch(
      noteActions.loadNotes({ searchTerm: '', isFiltered: false })
    );
    this._store.dispatch(ctaActions.loadCTA());
  }

  /**
   * Remove a note by its id.
   *
   * @param id - The note id.
   */
  removeNote(id: string): void {
    this._store.dispatch(noteActions.archiveNote({ id }));
  }

  /**
   * On clicking a note, updated its 'isSelected' property.
   *
   * @param note - The clicked note.
   * @param status - The note state.
   */
  onNoteItemClick(note: INoteResponse, status: string): void {
    if (status !== STATUS.LOADING) {
      this._store.dispatch(noteActions.selectNote({ id: note._id }));
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
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.SEARCH })
    );
  }

  onSearchNoteAnimationEned(action: string): void {
    if (action === CTA_ACTION_STATES.SEARCH) {
      const searchBottomSheet = this._bottomSheet.open(NoteSearchComponent);
      searchBottomSheet
        .afterDismissed()
        .pipe(take(1))
        .subscribe(() => {
          this._store.dispatch(
            ctaActions.updateCTA({ action: CTA_ACTION_STATES.PENDING })
          );

          this.allNotes$ = this._store.select(selectAllNotes);
        });
    }
  }

  onAddNote(): void {
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.ADD })
    );
  }

  onAddNoteAnimationEnd(action: string): void {
    if (action === CTA_ACTION_STATES.ADD) {
      this._router.navigate(['/notes', 'new']);
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
