import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteDialog } from './delete-note.dialog';

describe('DeleteNoteDialog', () => {
  let component: DeleteNoteDialog;
  let fixture: ComponentFixture<DeleteNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteNoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
