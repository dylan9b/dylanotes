import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';

export const notesAdapter: EntityAdapter<INoteResponse> =
  createEntityAdapter<INoteResponse>({
    selectId: (note) => note?._id,
    sortComparer: (a, b) =>
      new Date(b?.dateCreated)?.getTime() - new Date(a?.dateCreated)?.getTime(),
  });
