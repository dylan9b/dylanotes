import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { NoteItem } from '../item/_models/note-item.model';

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
export class NotesListComponent {
    notes: NoteItem[] = [];
    noteSteps = NotesStep;

    constructor() {
        this.notes = this.populateNoteItems();
    }

    addNote(): void {
        this.notes = [{ ...{} as NoteItem, body: 'fg', id: 'fdgf', title: 'fdgf', dateCreated: new Date() }, ...this.notes];
    }

    removeNote(index: number): void {
        this.notes[index].isDeleted = !this.notes[index]?.isDeleted;

        setTimeout(() => {
            this.notes.splice(index, 1);
        }, 250);
    }

    pinNote(index: number): void {
        this.notes[index].isPinned = !this.notes[index]?.isPinned;
    }

    completeNote(index: number): void {
        this.notes[index].isComplete = !this.notes[index]?.isComplete;
    }

    private populateNoteItems(): NoteItem[] {
        return [{
            ... {} as NoteItem,
            id: 'gfdghdfh',
            title: 'Lorem Ipsum -- title',
            body: 'Lorem Ipsum -- body',
            dateCreated: new Date()
        },

        {
            ... {} as NoteItem,
            id: 'gfdghdfh',
            title: 'Lorem Ipsum 2 -- title',
            body: 'Lorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- body',
            dateCreated: new Date()
        }];
    }

}
