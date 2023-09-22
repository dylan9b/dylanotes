export interface CTAState {
  cta: CTAResponse;
}

export interface CTAResponse {
  status: 'pending' | 'loading' | 'error' | 'success';
  action: 'back' | 'search' | 'add' | null;
}
