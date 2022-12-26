import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { DefaultComponent } from 'src/app/default-component/default-component';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { NotesItemFormControl } from './_models/note-item-form-control.model';
import { NotesItemValidation } from './_models/note-item-validation.model';
import { NoteItem } from './_models/note-item.model';

@Component({
    selector: 'app-notes-item',
    templateUrl: './notes-item.component.html',
    styleUrls: ['./notes-item.component.scss']
})
export class NotesItemComponent extends DefaultComponent implements OnInit, OnDestroy {

    form!: FormGroup;
    validation!: NotesItemValidation | null;
    noteSteps = NotesStep;

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
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
                        return of({ isEdit: true });
                    } else {
                        return of({ isEdit: false });
                    }
                })
            )
            .subscribe({
                next: (response) => {
                    this.initForm();
                    console.log("response", response);
                },

                error: (error) => {
                    console.log("error", error);
                }
            });

        this.subs?.push(route$);
    }

    private initForm(note?: NoteItem): void {
        let control = new NotesItemFormControl();

        if (note) {
            control.id.setValue(note?.id);
            control.title.setValue(note?.title);
            control.body.setValue(note?.body);
        }

        this.form = this.formBuilder?.group(control);
    }

    submitForm(): void {
        this.validation = new NotesItemValidation(this.form);

        if (this.form?.valid) {


        } else {
            this.form?.markAllAsTouched();
        }
    }
}
