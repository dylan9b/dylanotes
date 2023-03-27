import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DefaultComponent } from 'src/app/default-component/default-component';
import { NotesStep } from 'src/app/header/_models/header-input.model';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note-service';
import { INoteResponse } from '../item/_models/note-response.model';
import { INoteRequest } from '../item/_models/note-request.model';
import { Animations } from 'src/app/animations/animations';
import { delay } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    Animations.pinUnpin,
    Animations.completeIncomplete,
    Animations.delete,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotesListComponent
  extends DefaultComponent
  implements OnInit, OnDestroy
{
  notes: INoteResponse[] = [];
  noteSteps = NotesStep;
  isEmptyResult: boolean = false;
  isLoading: boolean = false;

  constructor(
    private noteService: NoteService,
    private apiErrorService: ApiErrorService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getNotes();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * Retrieve notes boased on a filter (if applicable)
   *
   * @param delayTime - The delay time to show the results after loading spinner.
   * @param input - The inputs from the search term.
   * @param isFilterApplied - Flagging if the notes are retrieved in original formet or though a filter.
   */
  getNotes(delayTime?: number, input?: Event, isFilterApplied?: boolean): void {
    delayTime = delayTime || 0;
    isFilterApplied = isFilterApplied || false;
    isFilterApplied ? (this.isLoading = true) : (this.isLoading = false);

    const searchTerm = (input?.target as HTMLInputElement)?.value || '';

    const notes$ = this.noteService
      .getNotes(searchTerm)
      .pipe(delay(delayTime))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.notes = response;
          this.isEmptyResult =
            this.notes?.length === 0 && searchTerm?.length > 0;
        },
        error: (error) => {
          this.isLoading = false;
          this.apiErrorService.handleError(error);
        },
      });

    this.subs.push(notes$);
  }

  /**
   * Remove a note by its id.
   *
   * @param id - The note id.
   */
  removeNote(id: string): void {
    const notes$ = this.noteService.deleteNote(id).subscribe({
      next: (response) => {
        const index = this.notes.findIndex((n) => n._id === response?._id);

        if (index > -1) {
          this.notes[index].isArchived = response?.isArchived;

          setTimeout(() => {
            this.notes.splice(index, 1);
          }, 250);
        }
      },
      error: (error) => {
        this.apiErrorService.handleError(error);
      },
    });

    this.subs.push(notes$);
  }

  /**
   * Pin a note by its id.
   *
   * @param note - The note to pin.
   */
  pinNote(note: INoteResponse): void {
    let request = {} as INoteRequest;
    request = {
      ...request,
      _id: note?._id,
      isPinned: !note?.isPinned,
    };

    const pinNote$ = this.noteService.putNote(request).subscribe({
      next: (response) => {
        const index = this.notes.findIndex((n) => n._id === response?._id);

        if (index > -1) {
          this.notes[index].isPinned = response?.isPinned;
        }
      },
      error: (error) => {
        this.apiErrorService.handleError(error);
      },
    });

    this.subs.push(pinNote$);
  }

  /**
   * Mark a note as complete.
   *
   * @param note - The note to complete.
   */
  completeNote(note: INoteResponse): void {
    let request = {} as INoteRequest;
    request = {
      ...request,
      _id: note?._id,
      isComplete: !note?.isComplete,
    };

    const completeNote$ = this.noteService.putNote(request).subscribe({
      next: (response) => {
        const index = this.notes.findIndex((n) => n._id === response?._id);

        if (index > -1) {
          this.notes[index].isComplete = response?.isComplete;
        }
      },
      error: (error) => {
        this.apiErrorService.handleError(error);
      },
    });

    this.subs.push(completeNote$);
  }
}
