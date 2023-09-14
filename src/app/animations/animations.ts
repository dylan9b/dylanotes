import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const Animations = {
  pinUnpin: trigger('pinUnpin', [
    state(
      'pinned',
      style({
        opacity: '1',
        transform: 'scale(1.1)',
        color: '#fe76c2',
      })
    ),
    state(
      'unPinned',
      style({
        opacity: '1',
        transform: 'scale(1.1)',
        color: '#cccccc',
      })
    ),
    transition('pinned <=> unPinned', [
      style({
        transform: 'scale(0)',
        opacity: '0',
      }),
      animate('0.15s'),
    ]),
  ]),

  completeIncomplete: trigger('completeIncomplete', [
    state(
      'complete',
      style({
        opacity: '1',
        transform: 'scale(1.1)',
        color: '#3bb273',
      })
    ),
    state(
      'inComplete',
      style({
        opacity: '1',
        transform: 'scale(1.1)',
        color: '#cccccc',
      })
    ),

    transition('inComplete <=> complete', [
      style({
        transform: 'scale(0)',
        opacity: '0',
      }),
      animate('0.15s'),
    ]),
  ]),

  delete: trigger('delete', [
    state(
      'delete',
      style({
        opacity: '0',
        transform: 'scale(0)',
        height: '0px',
        padding: '0px',
        'margin-top': '0px',
      })
    ),
    transition('void => delete', [
      style({
        opacity: '1',
        transform: 'scale(1.1)',
      }),
      animate('0.15s'),
    ]),
  ]),
};
