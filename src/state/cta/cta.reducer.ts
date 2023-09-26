import { createReducer, on } from '@ngrx/store';
import { CTAState, CTA_ACTION_STATES, STATUS } from './cta.state';

import { ctaActions } from './cta.actions';

export const initialState: CTAState = {
  action: CTA_ACTION_STATES.PENDING,
};

export const ctaReducer = createReducer(
  initialState,

  // GET CTA
  on(ctaActions.loadCTA, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(ctaActions.loadCTASuccess, (state) => {
    return {
      ...state,
      action: state.action,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(ctaActions.loadCTAFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  })),

  // UPDATE CTA
  on(ctaActions.updateCTA, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(ctaActions.updateCTASuccess, (state, { action }) => {
    return {
      ...state,
      action: action,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(ctaActions.updateCTAFail, (state, { error }) => ({
    ...state,
    error: error,
    status: STATUS.ERROR,
  }))
);
