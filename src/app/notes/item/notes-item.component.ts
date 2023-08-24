import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note-service';
import { from, map, of, switchMap } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { DefaultComponent } from 'src/app/default-component/default-component';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { NotesItemFormControl } from './_models/note-item-form-control.model';
import { NotesItemValidation } from './_models/note-item-validation.model';
import { INoteRequest } from './_models/note-request.model';
import { INoteResponse } from './_models/note-response.model';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.pinUnpin, Animations.completeIncomplete],
})
export class NotesItemComponent
  extends DefaultComponent
  implements OnInit, OnDestroy
{
  form!: FormGroup;
  validation!: NotesItemValidation | null;
  noteSteps = NotesStep;
  isEdit!: boolean;
  note!: INoteResponse | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private apiErrorService: ApiErrorService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.subscribeRouteParams();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private subscribeRouteParams(): void {
    const route$ = this.route?.params
      .pipe(
        map((params) => {
          const { id } = params;
          return id as string;
        }),
        switchMap((id) => {
          if (id) {
            return of({
              isEdit: true,
              id,
            });
          } else {
            return of({
              isEdit: false,
              id: null,
            });
          }
        }),
        switchMap((response) => {
          const { id, isEdit } = response;
          if (isEdit && id) {
            return this.noteService.getNote(id).pipe(
              map((note) => {
                return {
                  note,
                  isEdit,
                };
              })
            );
          }

          return of({ note: null, isEdit: false });
        })
      )
      .subscribe({
        next: (response) => {
          this.isEdit = response?.isEdit;
          this.note = response?.note;
          this.initForm(response?.note);
        },

        error: (error) => {
          this.apiErrorService.handleError(error);
        },
      });

    this.subs?.push(route$);
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

    this.form = this.formBuilder?.group(control);
  }

  cancelForm(): void {
    this.initForm(this.note);
  }

  submitForm(): void {
    this.validation = new NotesItemValidation(this.form);

    if (this.form?.valid && this.form?.dirty) {
      if (!this.isEdit) {
        this.addNote();
      } else {
        this.editNote();
      }
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
      dateCreated: new Date(),
      isComplete: false,
      isArchived: false,
      isPinned: false,
    };

    const newNote$ = this.noteService
      .postNote(newNote)
      .pipe(
        switchMap(() => {
          return from(this.router.navigate(['/notes', 'list']));
        })
      )
      .subscribe({
        next: () => {
          // this.toastrService.success('Note created successfully!')
        },
        error: (error) => {
          this.apiErrorService.handleError(error);
        },
      });

    this.subs.push(newNote$);
  }

  private editNote(): void {
    const rawForm = this.form.getRawValue();

    let newNote = {} as INoteRequest;
    newNote = {
      ...(this.note as INoteRequest),
      title: rawForm?.title,
      body: rawForm?.body,
      dateModified: new Date(),
      isComplete: rawForm?.isComplete,
      isPinned: rawForm?.isPinned,
    };

    const editNote$ = this.noteService.putNote(newNote).subscribe({
      next: () => {
        // this.toastrService.success('Note updated successfully');
      },
      error: (error) => {
        this.apiErrorService.handleError(error);
      },
    });

    this.subs.push(editNote$);
  }

  pinNote(note: INoteResponse | null): void {
    if (note) {
      let request = {} as INoteRequest;
      request = {
        ...request,
        _id: note?._id,
        isPinned: !note?.isPinned,
      };

      const pinNote$ = this.noteService.putNote(request).subscribe({
        next: (response) => {
          this.note = response;
        },
        error: (error) => {
          this.apiErrorService.handleError(error);
        },
      });

      this.subs.push(pinNote$);
    }
  }

  completeNote(note: INoteResponse | null): void {
    if (note) {
      let request = {} as INoteRequest;
      request = {
        ...request,
        _id: note?._id,
        isComplete: !note?.isComplete,
      };

      const completeNote$ = this.noteService.putNote(request).subscribe({
        next: (response) => {
          this.note = response;
        },
        error: (error) => {
          this.apiErrorService.handleError(error);
        },
      });

      this.subs.push(completeNote$);
    }
  }
}
