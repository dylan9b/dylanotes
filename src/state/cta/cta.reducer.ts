import { createReducer, on } from '@ngrx/store';

import { ctaActions } from './cta.actions';
import { CTAState } from './cta.state';

export const initialState: CTAState = {
  cta: {
    status: 'pending',
    action: null,
  },
};

export const ctaReducer = createReducer(
  initialState,

  // GET CTA
  on(ctaActions.loadCTA, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ctaActions.loadCTASuccess, (state) => {
    return {
      ...state,
      error: null,
      status: 'success',
    };
  }),
  on(ctaActions.loadCTAFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // UPDATE CTA
  on(ctaActions.updateCTA, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ctaActions.updateCTASuccess, (state, { cta }) => {
    return {
      ...state,
      cta: { ...state.cta, ... cta },
      error: null,
      status: 'success',
    };
  }),
  on(ctaActions.updateCTAFail, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
