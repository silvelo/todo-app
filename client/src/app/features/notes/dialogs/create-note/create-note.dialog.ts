import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoteTag } from '../../enums/note-tag';
import { NoteConvertTo } from '../../services/note-convert-to.service';

@Component({
  selector: 'app-create-note',
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
  templateUrl: './create-note.dialog.html',
  styleUrl: './create-note.dialog.css',
})
export class CreateNoteDialog {
  notePayloadForm = NoteConvertTo.notePayloadToForm();
  noteTagEnum = NoteTag;
}
