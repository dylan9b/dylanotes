import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap, takeUntil } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { NotesItemFormControl } from './_models/note-item-form-control.model';
import { NotesItemValidation } from './_models/note-item-validation.model';
import { INoteRequest } from './_models/note-request.model';
import { INoteResponse } from './_models/note-response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectAllNotes } from 'src/state/notes/note.selectors';
import {
  loadNote,
  postNote,
  updateNote,
} from '../../../state/notes/note.actions';

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
  note!: INoteResponse | null;

  notes$ = this._store.select(selectAllNotes);
  destroyRef = inject(DestroyRef);

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeRouteParams();
  }

  private subscribeRouteParams(): void {
    this._route.params
      .pipe(
        map((params) => {
          const { id } = params;
          return id as string;
        }),
        switchMap((id) => {
          if (id) {
            this._store.dispatch(loadNote({ id }));
            return this.notes$.pipe(
              switchMap((result) => {
                return of(Object.values(result) as INoteResponse[]);
              }),
              switchMap((data) => {
                return of(data.find((d) => d._id === id));
              })
            );
          }

          return of(null);
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

  cancelForm(): void {
    this.initForm(this.note);
  }

  submitForm(): void {
    this.validation = new NotesItemValidation(this.form);

    if (this.form?.valid && this.form?.dirty) {
      !this.note?._id ? this.addNote() : this.editNote();
      this.form.markAsPristine();
    } else {
      this.form?.markAllAsTouched();
    }
  }

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

    this._store.dispatch(postNote({ note: newNote }));

    this._snackBar.open('Note successfully created!', 'Success', {
      panelClass: 'status__200',
    });

    // this._router.navigate(['/notes', 'list']);
  }

  private editNote(): void {
    const rawForm = this.form.getRawValue();

    let updatedNote = {} as INoteRequest;
    updatedNote = {
      ...(this.note!),
      title: rawForm?.title,
      body: rawForm?.body,
      dateModified: new Date().toJSON(),
      isComplete: rawForm?.isComplete,
      isPinned: rawForm?.isPinned,
    };

    this._store.dispatch(updateNote({ note: updatedNote }));

    this._snackBar.open('Note successfully updated!', 'Success', {
      panelClass: 'status__200',
    });
  }

  pinNote(note: INoteResponse | null): void {
    if (note) {
      let updatedNote = {} as INoteRequest;
      updatedNote = {
        ...updatedNote,
        _id: note?._id,
        isPinned: !note?.isPinned,
      };

      this._store.dispatch(updateNote({ note: updatedNote }));
    }
  }

  completeNote(note: INoteResponse | null): void {
    if (note) {
      let updatedNote = {} as INoteRequest;
      updatedNote = {
        ...updatedNote,
        _id: note?._id,
        isComplete: !note?.isComplete,
      };

      this._store.dispatch(updateNote({ note: updatedNote }));
    }
  }
}
