import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/app.state';
import { ctaActions } from 'src/state/cta/cta.actions';
import { selectCta } from 'src/state/cta/cta.selectors';
import { CTA_ACTION_STATES } from 'src/state/cta/cta.state';
import { Animations } from '../animations/animations';
import { IHeaderInput } from './_models/header-input.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.cta],
})
export class HeaderComponent {
  cta$ = this._store.select(selectCta);

  private _input!: IHeaderInput;

  get input(): IHeaderInput {
    return this._input;
  }

  @Input()
  set input(value: IHeaderInput) {
    this._input = value;
  }

  constructor(
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  onBackButtonClick(): void {
    this._store.dispatch(ctaActions.updateCTA({ action: 'back' }));
  }

  goBack(cta: string): void {
    if (cta === CTA_ACTION_STATES.BACK) {
      this._router.navigate(['./notes', 'list']);
    }
  }
}
