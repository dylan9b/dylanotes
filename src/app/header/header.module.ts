import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports: [HeaderComponent],
    providers: [],
    bootstrap: [HeaderComponent]
})
export class HeaderModule { }
