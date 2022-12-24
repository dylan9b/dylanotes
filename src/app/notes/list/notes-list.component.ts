import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';
import { NoteItem } from '../item/_models/note-item.model';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss'],
    animations: [
        trigger('pinUnpin', [
            state('pinned', style({
                opacity: 1,
                transform: 'scale(1)',
                color: '#fe76c2'
            })),
            state('unPinned', style({
                opacity: 1,
                transform: 'scale(1)',
                color: '#cccccc'
            })),
            state('*', style({
                color: '#cccccc'
            })),
            transition('pinned => unPinned', [
                style({
                    transform: 'scale(0)',
                    opactiy: 0,
                }),
                animate('0.15s')
            ]),
            transition('unPinned => pinned', [
                style({
                    transform: 'scale(0)',
                    opactiy: 0,
                }),
                animate('0.15s'),
            ]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None
})
export class NotesListComponent {
    notes: NoteItem[] = [];

    constructor() {
        this.notes = this.populateNoteItems();
    }

    addNote(): void {
        this.notes = [{ ...{} as NoteItem, body: 'fg', id: 'fdgf', title: 'fdgf' }, ...this.notes];
    }

    removeNote(index: number): void {
        this.notes.splice(index, 1);
    }

    pinNote(index: number): void {
        this.notes[index].isPinned = !this.notes[index]?.isPinned;

    }

    private populateNoteItems(): NoteItem[] {
        return [{
            ... {} as NoteItem,
            id: 'gfdghdfh',
            title: 'Lorem Ipsum -- title',
            body: 'Lorem Ipsum -- body'
        },

        {
            ... {} as NoteItem,
            id: 'gfdghdfh',
            title: 'Lorem Ipsum 2 -- title',
            body: 'Lorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- bodyLorem Ipsum 2 -- body'
        }];
    }

}
