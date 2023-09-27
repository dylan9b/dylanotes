import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoteSearchComponent } from './note-search.component';

@NgModule({
  declarations: [
    NoteSearchComponent
  ],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [NoteSearchComponent]
})
export class NoteSearchModule {}
