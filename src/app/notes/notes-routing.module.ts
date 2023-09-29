import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotesItemComponent } from './item/notes-item.component';
import { NotesListComponent } from './list/notes-list.component';

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
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: NotesListComponent,
      },
      {
        path: 'new',
        component: NotesItemComponent,
      },
      {
        path: ':id',
        component: NotesItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
