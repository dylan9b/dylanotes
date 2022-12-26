import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IHeaderInput, NotesStep } from './_models/header-input.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
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

    constructor(private router: Router) {
    }

    goBack(): void {
        if (this.input.step === NotesStep.ITEM) {
            this.router.navigate(['./notes', 'list']);
        }
    }

}
