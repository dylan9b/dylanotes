import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/state/app.state';
import { noteActions } from 'src/state/notes/note.actions';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteSearchComponent {
  constructor(private readonly _store: Store<AppState>) {}

  /**
   * Retrieves the list of notes based on a search term.
   *
   * @param input - The search term.
   */
  searchNotes(input: Event): void {
    const searchTerm = (input?.target as HTMLInputElement)?.value || '';
    this._store.dispatch(
      noteActions.loadNotes({ searchTerm, isFiltered: true })
    );
  }
}
