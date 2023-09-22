import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ctaActions = createActionGroup({
  source: 'CTA',
  events: {
    // GET CTA
    'Load CTA': emptyProps(),
    'Load CTA Success': props<{ action: string}>(),
    'Load CTA Fail': props<{ error: string }>(),

    // UPDATE CTA
    'Update CTA': props<{ action: string }>(),
    'Update CTA Success': props<{ action: string }>(),
    'Update CTA Fail': props<{ error: string }>(),

    // ARCHIVE NOTE
    // 'Archive Note': props<{ id: string }>(),
    // 'Archive Note Success': props<{ note: INoteResponse }>(),
    // 'Archive Note Fail': props<{ error: string }>(),

    // POST NOTE
    // 'Post Note': props<{ note: INoteResponse }>(),
    // 'Post Note Success': props<{ note: INoteResponse }>(),
    // 'Post Note Fail': props<{ error: string }>(),

    // SELECT NOTE
    // 'Select Note': props<{ note: INoteResponse }>(),
    // 'Select Note Success': props<{ note: INoteResponse }>(),
    // 'Select Note Fail': props<{ error: string }>(),
  },
});