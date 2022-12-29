import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultComponent } from 'src/app/default-component/default-component';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note-service';
import { INoteResponse } from '../item/_models/note-response.model';
import { INoteRequest } from '../item/_models/note-request.model';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss'],
    animations: [
        trigger('pinUnpin', [
            state('pinned', style({
                opacity: '1',
                transform: 'scale(1.1)',
                color: '#fe76c2'
            })),
            state('unPinned', style({
                opacity: '1',
                transform: 'scale(1.1)',
                color: '#cccccc'
            })),
            state('*', style({
                color: '#cccccc',
                transform: 'scale(1.1)',
            })),
            transition('pinned => unPinned', [
                style({
                    transform: 'scale(0)',
                    opacity: '0',
                }),
                animate('0.15s')
            ]),
            transition('unPinned => pinned', [
                style({
                    transform: 'scale(0)',
                    opacity: '0',
                }),
                animate('0.15s'),
            ]),
        ]),

        trigger('completeIncomplete', [
            state('complete', style({
                opacity: '1',
                transform: 'scale(1.1)',
                color: '#3bb273'
            })),
            state('inComplete', style({
                opacity: '1',
                transform: 'scale(1.1)',
                color: '#cccccc'
            })),
            state('*', style({
                color: '#cccccc',
                transform: 'scale(1.1)',
            })),
            transition('complete => inComplete', [
                style({
                    transform: 'scale(0)',
                    opacity: '0',
                }),
                animate('0.15s')
            ]),
            transition('inComplete => complete', [
                style({
                    transform: 'scale(0)',
                    opacity: '0',
                }),
                animate('0.15s'),
            ]),
        ]),

        trigger('deleteUndeleteState', [
            state('delete', style({
                opacity: '0',
            })),
            transition('void => delete', [
                style({
                    opacity: '1',
                }),
                animate('0.25s')
            ]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None
})
export class NotesListComponent extends DefaultComponent implements OnInit, OnDestroy {
    notes: INoteResponse[] = [];
    noteSteps = NotesStep;

    constructor(private noteService: NoteService, private apiErrorService: ApiErrorService, private router: Router) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.getNotes();
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    getNotes(): void {
        const notes$ = this.noteService.getNotes()
            .subscribe({
                next: (response) => {
                    this.notes = response;
                },
                error: (error) => {
                    this.apiErrorService.handleError(error);
                }
            });

        this.subs.push(notes$);
    }

    removeNote(id: string): void {
        const notes$ = this.noteService.deleteNote(id)
            .subscribe({
                next: (response) => {
                    const index = this.notes.findIndex(n => n._id === response?._id);

                    if (index > -1) {
                        this.notes[index].isArchived = response?.isArchived;
                        setTimeout(() => {

                            this.notes.splice(index, 1);
                        }, 250)
                    }
                },
                error: (error) => {
                    this.apiErrorService.handleError(error);
                },
            });

        this.subs.push(notes$);
    }

    pinNote(id: string, isPinned: boolean): void {
        let request = {} as INoteRequest;
        request = {
            ...request,
            _id: id,
            isPinned: !isPinned
        };

        const pinNote$ = this.noteService.putNote(request).subscribe({
            next: (response) => {
                const index = this.notes.findIndex(n => n._id === response?._id);

                if (index > -1) {
                    this.notes[index].isPinned = response?.isPinned;
                }
            },
            error: (error) => {
                this.apiErrorService.handleError(error);
            }
        });

        this.subs.push(pinNote$);
    }

    completeNote(index: number): void {
        this.notes[index].isComplete = !this.notes[index]?.isComplete;
    }
}
