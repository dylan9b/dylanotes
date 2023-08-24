import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/header/header.module';
import { NotesListComponent } from './notes-list.component';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, RouterModule, HeaderModule, MatRippleModule, MatButtonModule],
  declarations: [NotesListComponent],
  providers: [],
  bootstrap: [NotesListComponent],
})
export class NotesListModule {}
