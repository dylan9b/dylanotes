import { createActionGroup, props } from '@ngrx/store';

import { Update } from '@ngrx/entity';
import { INoteRequest } from 'src/app/notes/item/_models/note-request.model';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';

export const noteActions = createActionGroup({
  source: 'NOTES',
  events: {
    // GET NOTES
    'Load Notes': props<{ searchTerm: string; isFiltered: boolean }>(),
    'Load Notes Success': props<{
      notes: INoteResponse[];
      isFiltered: boolean;
    }>(),
    'Load Notes Fail': props<{ error: string }>(),

    // UPDATE NOTE
    'Update Note': props<{ note: INoteRequest }>(),
    'Update Note Success': props<{ note: Update<INoteResponse> }>(),
    'Update Note Fail': props<{ error: string }>(),

    // ARCHIVE NOTE
    'Archive Note': props<{ id: string }>(),
    'Archive Note Success': props<{ note: Update<INoteResponse> }>(),
    'Archive Note Fail': props<{ error: string }>(),

    // POST NOTE
    'Post Note': props<{ note: INoteRequest }>(),
    'Post Note Success': props<{ note: INoteResponse }>(),
    'Post Note Fail': props<{ error: string }>(),

    // SELECT NOTE
    'Select Note': props<{ id: string }>(),
    'Select Note Success': props<{ note: Update<INoteResponse> }>(),
    'Select Note Fail': props<{ error: string }>(),
  },
});
