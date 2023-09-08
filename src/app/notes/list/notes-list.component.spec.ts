import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiErrorService } from '@services/api-error.service';
import { NoteService } from '@services/note.service';
import { HeaderModule } from 'src/app/header/header.module';

import { NotesListComponent } from './notes-list.component';

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesListComponent],
      providers: [NoteService, ApiErrorService],
      imports: [
        HttpClientModule,
        HeaderModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
