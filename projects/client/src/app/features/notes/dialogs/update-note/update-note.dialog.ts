import { KeyValuePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoteTag } from '../../enums/note-tag';
import { NoteDTO } from '../../interface/note.dto';
import { NotePayloadForm } from '../../interface/note.payload';
import { NoteConvertTo } from '../../services/note-convert-to.service';

@Component({
  selector: 'app-update-note',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    KeyValuePipe,
  ],
  templateUrl: './update-note.dialog.html',
  styleUrl: './update-note.dialog.css',
})
export class UpdateNoteDialog {
  notePayloadForm: FormGroup<NotePayloadForm>;
  noteTagEnum = NoteTag;

  constructor(@Inject(MAT_DIALOG_DATA) public noteDTO: NoteDTO) {
    this.notePayloadForm = NoteConvertTo.notePayloadToForm(noteDTO);
  }
}
