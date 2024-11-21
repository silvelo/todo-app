import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NoteDTO } from '../../interface/note.dto';

@Component({
  selector: 'app-delete-note',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './delete-note.dialog.html',
  styleUrl: './delete-note.dialog.css',
})
export class DeleteNoteDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public noteDTO: NoteDTO) {}
}
