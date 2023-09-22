import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, pipe } from 'rxjs';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ctaActions } from './cta.actions';
import { selectCta } from './cta.selectors';
import { CTAResponse } from './cta.state';

@Injectable()
export class CtaEffects {
  constructor(private _actions$: Actions, private _store: Store<AppState>) {}

  cta$ = this._store.select(selectCta);

  loadCta$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ctaActions.loadCTA),
      pipe(
        map((cta) =>
          ctaActions.loadCTASuccess({ cta: cta as unknown as CTAResponse })
        ),
        catchError((error) => of(ctaActions.loadCTAFail({ error })))
      )
    )
  );

  updateCta$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ctaActions.updateCTA),
      pipe(
        map((cta) =>
          ctaActions.updateCTASuccess({ cta: cta?.cta })
        ),
        catchError((error) => of(ctaActions.updateCTAFail({ error })))
      )
    )
  );
}
