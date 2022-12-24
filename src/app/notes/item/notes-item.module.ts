import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/header/header.module';
import { NotesItemComponent } from './notes-item.component';

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        NotesItemComponent
    ],
    providers: [],
    bootstrap: [NotesItemComponent]
})
export class NotesItemModule { }
