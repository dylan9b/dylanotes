import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesItemComponent } from './item/notes-item.component';
import { NotesListComponent } from './list/notes-list.component';
import { NotesComponent } from './notes.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'notes/list',
        pathMatch: 'full',
    },
    {
        path: 'notes',
        children: [
            {
                path: '',
                component: NotesComponent
            },
            {
                path: 'list',
                component: NotesListComponent
            },
            {
                path: ':id',
                component: NotesItemComponent

            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotesRoutingModule { }
