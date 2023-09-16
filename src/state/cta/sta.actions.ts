// import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

// import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
// import { noteKey } from '../notes/note.actions';

// export const CTA_KEY = '[CTA]';

// // GET CTA
// export const getCTA = createAction(`${noteKey} GET CTA`, emptyProps());
// export const getCTASuccess = createAction(
//   `${noteKey} GET CTA: Success`,
//   props<{ notes: INoteResponse[] }>()
// );
// export const getCTAFail = createAction(
//   `${noteKey} GET CTA: Fail`,
//   props<{ error: string }>()
// );

// const authApiActions = createActionGroup({
//   source: 'CTA',
//   events: {
//     // defining events with payload using the `props` function
//     'Login Success': props<{ userId: number; token: string }>(),
//     'Login Failure': props<{ error: string }>(),

//     // defining an event without payload using the `emptyProps` function
//     'Logout Success': emptyProps(),

//     // defining an event with payload using the props factory
//     'Logout Failure': (error: Error) => ({ error }),
//   },
// });
