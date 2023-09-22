import { Component, Input } from '@angular/core';
import { IHeaderInput, NotesStep } from './_models/header-input.model';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/app.state';
import { ctaActions } from 'src/state/cta/cta.actions';
import { Animations } from '../animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.cta],
})
export class HeaderComponent {
  private _input!: IHeaderInput;

  get input(): IHeaderInput {
    return this._input;
  }

  @Input()
  set input(value: IHeaderInput) {
    this._input = value;
  }

  constructor(private _router: Router, private _store: Store<AppState>) {}

  goBack(): void {
    this._store.dispatch(ctaActions.updateCTA({ action: 'back' }));
    
    if (this.input.step === NotesStep.ITEM) {
      this._router.navigate(['./notes', 'list']);
    }
  }
}
