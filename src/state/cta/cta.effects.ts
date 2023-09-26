import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, pipe, switchMap, withLatestFrom } from 'rxjs';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ctaActions } from './cta.actions';
import { selectCta } from './cta.selectors';

@Injectable()
export class CtaEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  cta$ = this._store.select(selectCta);

  loadCta$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ctaActions.loadCTA),
      withLatestFrom(this.cta$),
      switchMap(([action, data]) => {
        return of(
          ctaActions.loadCTASuccess({
            action: data,
          })
        );
      })
    )
  );

  updateCta$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ctaActions.updateCTA),
      pipe(
        map((data) => ctaActions.updateCTASuccess({ action: data?.action })),
        catchError((error) => of(ctaActions.updateCTAFail({ error })))
      )
    )
  );
}
