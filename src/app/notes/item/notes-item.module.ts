import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/header/header.module';
import { NotesItemComponent } from './notes-item.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    imports: [
    CommonModule,
        HeaderModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        AngularEditorModule,
    ],
    declarations: [
        NotesItemComponent
    ],
    providers: [],
    bootstrap: [NotesItemComponent]
})
export class NotesItemModule { }
