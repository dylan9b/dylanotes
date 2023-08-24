import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note-service';
import { HeaderModule } from 'src/app/header/header.module';

import { NotesItemComponent } from './notes-item.component';

describe('NotesItemComponent', () => {
    let component: NotesItemComponent;
    let fixture: ComponentFixture<NotesItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotesItemComponent],
            imports: [RouterTestingModule, HttpClientModule, BrowserAnimationsModule, HeaderModule, FormsModule, ReactiveFormsModule],
            providers: [NoteService, ApiErrorService],
        })
            .compileComponents();

        fixture = TestBed.createComponent(NotesItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
