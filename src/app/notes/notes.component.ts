import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note-service';
import { DefaultComponent } from '../default-component/default-component';
import { INoteRequest } from './item/_models/note-request.model';
import { INoteResponse } from './item/_models/note-response.model';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent extends DefaultComponent implements OnInit, OnDestroy {

    constructor(private noteService: NoteService, private apiErrorService: ApiErrorService) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    pinNote(note: INoteResponse, successCallBack: Function): void {
        let request = {} as INoteRequest;
        request = {
            ...request,
            _id: note?._id,
            isPinned: !note?.isPinned
        };

        const pinNote$ = this.noteService.putNote(request).subscribe({
            next: (response) => {
                successCallBack(response);
            },
            error: (error) => {
                this.apiErrorService.handleError(error);
            }
        });

        this.subs.push(pinNote$);
    }

}
