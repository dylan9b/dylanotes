import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-default-component',
    templateUrl: './default-component.html',
})
export class DefaultComponent implements OnInit, OnDestroy {
    subs: Subscription[] = [];

    ngOnInit(): void {
        this.subs = [];
    }

    ngOnDestroy(): void {
        this.subs?.map(sub => {
            sub?.unsubscribe();
        });
    }
}
