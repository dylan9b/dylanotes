import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/header/header.module';
import { NotesListComponent } from './notes-list.component';

@NgModule({
    imports: [CommonModule, RouterModule, HeaderModule],
    declarations: [
        NotesListComponent
    ],
    providers: [],
    bootstrap: [NotesListComponent]
})
export class NotesListModule { }
