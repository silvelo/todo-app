import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteDialog } from './update-note.dialog';

describe('UpdateNoteDialog', () => {
  let component: UpdateNoteDialog;
  let fixture: ComponentFixture<UpdateNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
