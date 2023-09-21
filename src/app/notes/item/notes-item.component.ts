import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of, switchMap } from 'rxjs';
import { selectAllNotes, selectNote } from 'src/state/notes/note.selectors';

import { Animations } from 'src/app/animations/animations';
import { AppState } from '../../../state/app.state';
import { INoteRequest } from './_models/note-request.model';
import { INoteResponse } from './_models/note-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteUtilService } from '@services/note-util.service';
import { NotesItemFormControl } from './_models/note-item-form-control.model';
import { NotesItemValidation } from './_models/note-item-validation.model';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { Store } from '@ngrx/store';
import { noteActions } from 'src/state/notes/note.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.pinUnpin, Animations.completeIncomplete],
})
export class NotesItemComponent implements OnInit {
  form!: FormGroup;
  validation!: NotesItemValidation | null;
  noteSteps = NotesStep;
  note!: INoteResponse;

  allNotes$ = this._store.select(selectAllNotes);
  note$!: Observable<INoteResponse | null>;
  destroyRef = inject(DestroyRef);

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _store: Store<AppState>,
    private _noteUtilService: NoteUtilService
  ) {}

  ngOnInit(): void {
    this.subscribeRouteParams();
  }

  /**
   * Cancel the form.
   */
  cancelForm(): void {
    this.initForm(this.note);
  }

  /**
   * Submit the form.
   */
  submitForm(): void {
    this.validation = new NotesItemValidation(this.form);

    if (this.form?.valid && this.form?.dirty) {
      !this.note?._id ? this.addNote() : this.editNote();
      this.form.markAsPristine();
    } else {
      this.form?.markAllAsTouched();
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
   * Initialize the note.
   */
  private subscribeRouteParams(): void {
    this._route.params
      .pipe(
        map((params) => {
          const { id } = params;
          return id as string;
        }),
        switchMap((id) => {
          if (id) {
            this.note$ = this._store.select(selectNote(id));
            return this.note$.pipe(
              map((note) => {
                return { note, id };
              })
            );
          }

          return of({ note: null, id });
        }),
        switchMap((data) => {
          const { note, id } = data;
          if (note) {
            return of(note);
          } else {
            this._store.dispatch(noteActions.loadNotes({ searchTerm: '' }));
            this.note$ = this._store.select(selectNote(id));

            return this.note$;
          }
        })
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((note) => {
        if (note) {
          this.note = note;
        }
        this.initForm(note);
      });
  }

  /**
   * Initialize the form based on the note item passed.
   *
   * @param note - The note item.
   */
  private initForm(note?: INoteResponse | null): void {
    let control = new NotesItemFormControl();

    if (note) {
      control.id.setValue(note?._id);
      control.title.setValue(note?.title);
      control.body.setValue(note?.body);
      control.isComplete.setValue(note?.isComplete);
      control.isPinned.setValue(note?.isPinned);
    }

    this.form = this._formBuilder?.group(control);
  }

  /**
   * Add a new note.
   */
  private addNote(): void {
    const rawForm = this.form.getRawValue();

    let newNote = {} as INoteRequest;
    newNote = {
      ...newNote,
      title: rawForm?.title,
      body: rawForm?.body,
      dateCreated: new Date().toJSON(),
      dateModified: new Date().toJSON(),
      isComplete: false,
      isArchived: false,
      isPinned: false,
    };

    this._store.dispatch(noteActions.postNote({ note: newNote }));

    this._snackBar.open('Note successfully created!', 'Success', {
      panelClass: 'status__200',
    });

    this._router.navigate(['/notes', 'list']);
  }

  /**
   * Update note.
   */
  private editNote(): void {
    const rawForm = this.form.getRawValue();

    let updatedNote = {} as INoteRequest;
    updatedNote = {
      ...this.note!,
      title: rawForm?.title,
      body: rawForm?.body,
      dateModified: new Date().toJSON(),
      isComplete: rawForm?.isComplete,
      isPinned: rawForm?.isPinned,
    };

    this._store.dispatch(noteActions.updateNote({ note: updatedNote }));

    this._snackBar.open('Note successfully updated!', 'Success', {
      panelClass: 'status__200',
    });
  }
}
