import { NgModule } from '@angular/core';
import { NotesItemModule } from './item/notes-item.module';
import { NotesListModule } from './list/notes-list.module';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';

@NgModule({
    imports: [
        NotesItemModule,
        NotesListModule,
        NotesRoutingModule
    ],
    declarations: [
        NotesComponent
    ],
    providers: [],
    bootstrap: [NotesComponent]
})
export class NotesModule { }
