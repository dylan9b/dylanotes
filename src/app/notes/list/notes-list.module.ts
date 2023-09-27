import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/header/header.module';
import { NoteSearchModule } from '../search/note-search.module';
import { NotesListComponent } from './notes-list.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    MatRippleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    NoteSearchModule
  ],
  declarations: [NotesListComponent],
  providers: [],
  bootstrap: [NotesListComponent],
})
export class NotesListModule {}
