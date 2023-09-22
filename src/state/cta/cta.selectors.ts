import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CTAState } from './cta.state';

export const selectCtaState = (state: AppState) => state?.cta;

export const selectCta = createSelector(
  selectCtaState,
  (state: CTAState) => state?.cta
);
