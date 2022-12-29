import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note-service';
import { map, of, switchMap } from 'rxjs';
import { DefaultComponent } from 'src/app/default-component/default-component';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { NotesItemFormControl } from './_models/note-item-form-control.model';
import { NotesItemValidation } from './_models/note-item-validation.model';
import { NoteItem } from './_models/note-item.model';
import { INoteRequest } from './_models/note-request.model';
import { INoteResponse } from './_models/note-response.model';

@Component({
    selector: 'app-notes-item',
    templateUrl: './notes-item.component.html',
    styleUrls: ['./notes-item.component.scss']
})
export class NotesItemComponent extends DefaultComponent implements OnInit, OnDestroy {

    form!: FormGroup;
    validation!: NotesItemValidation | null;
    noteSteps = NotesStep;
    isEdit!: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private noteService: NoteService,
        private apiErrorService: ApiErrorService) {
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
                map(params => {
                    const { id } = params;
                    return id as string;
                }),
                switchMap(id => {
                    if (id) {
                        return of({
                            isEdit: true,
                            id
                        });
                    } else {
                        return of({
                            isEdit: false,
                            id: null
                        });
                    }
                }),
                switchMap(response => {
                    const { id, isEdit } = response;
                    if (isEdit && id) {
                        return this.noteService.getNote(id)
                            .pipe(
                                map(note => {
                                    return {
                                        note,
                                        isEdit
                                    }
                                })
                            )
                    }

                    return of({ note: null, isEdit: false });
                })
            )
            .subscribe({
                next: (response) => {
                    console.log('response', response);
                    this.isEdit = response?.isEdit;
                    this.initForm(response?.note);
                },

                error: (error) => {
                    this.apiErrorService.handleError(error);
                }
            });

        this.subs?.push(route$);
    }

    private initForm(note?: INoteResponse | null): void {
        let control = new NotesItemFormControl();

        if (note) {
            control.id.setValue(note?._id);
            control.title.setValue(note?.title);
            control.body.setValue(note?.body);
        }

        this.form = this.formBuilder?.group(control);
    }

    submitForm(): void {
        this.validation = new NotesItemValidation(this.form);

        if (this.form?.valid) {

            if (!this.isEdit) {
                this.addNote();
            }


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
            isComplete: false,
            isDeleted: false,
            isPinned: false
        };

        const newNote$ = this.noteService.postNote(newNote)
            .subscribe({
                next: (response) => {
                    this.router.navigate(['/notes', response?._id])
                },
                error: (error) => {
                    debugger;
                    this.apiErrorService.handleError(error);
                }
            });

        this.subs.push(newNote$);
    }
}
