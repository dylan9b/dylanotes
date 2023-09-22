import { CTAState } from './cta/cta.state';
import { NoteState } from './notes/notes.state';

export interface AppState {
  notes: NoteState;
  cta: CTAState;
}
