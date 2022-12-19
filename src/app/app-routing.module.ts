import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'notes',
        children: [
            {
                path: '',
                loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./notes/list/notes-list.module').then(m => m.NotesListModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./notes/item/notes-item.module').then(m => m.NotesItemModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
