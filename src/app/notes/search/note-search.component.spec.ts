import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearchComponent } from './note-search.component';

describe('NoteSearchComponent', () => {
  let component: NoteSearchComponent;
  let fixture: ComponentFixture<NoteSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteSearchComponent]
    });
    fixture = TestBed.createComponent(NoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
