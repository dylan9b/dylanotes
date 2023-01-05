import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    pinUnpin:
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

    completeIncomplete:
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

    delete:
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
};
