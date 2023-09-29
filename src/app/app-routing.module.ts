import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotesRoutingModule } from './notes/notes-routing.module';

const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () =>
      import('./notes/notes.module').then((m) => m.NotesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
