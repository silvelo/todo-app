import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteDialog } from './create-note.dialog';

describe('CreateNoteDialog', () => {
  let component: CreateNoteDialog;
  let fixture: ComponentFixture<CreateNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
