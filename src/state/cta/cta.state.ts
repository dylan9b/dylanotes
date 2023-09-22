export interface CTAState {
  action: string;
}

export const CTA_ACTION_STATES = {
  ADD: 'add',
  SEARCH: 'search',
  BACK: 'back',
  PENDING: 'pending',
}

export const STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}
