import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [HeaderComponent],
  providers: [],
  bootstrap: [HeaderComponent],
})
export class HeaderModule {}
