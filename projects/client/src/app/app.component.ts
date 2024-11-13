import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { NoteListComponent } from './features/notes/components/note-list/note-list.component';
import { CreateNoteDialog } from './features/notes/dialogs/create-note/create-note.dialog';
import { DeleteNoteDialog } from './features/notes/dialogs/delete-note/delete-note.dialog';
import { UpdateNoteDialog } from './features/notes/dialogs/update-note/update-note.dialog';
import { NoteDTO } from './features/notes/interface/note.dto';
import { NotePayload } from './features/notes/interface/note.payload';
import { NotesService } from './features/notes/services/notes.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteListComponent, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  #notesService = inject(NotesService);
  #snackBar = inject(MatSnackBar);
  #dialog = inject(MatDialog);
  noteList = derivedAsync(() => {
    this.onCreate();
    this.onUpdate();
    this.onDelete();
    return this.#notesService.getNotes();
  });
  onCreate = signal('');
  onUpdate = signal('');
  onDelete = signal('');

  onCreateNote() {
    this.#dialog
      .open(CreateNoteDialog)
      .afterClosed()
      .subscribe((notePayload: NotePayload) => {
        if (notePayload) {
          this.#notesService.createNote(notePayload).subscribe(noteDTO => {
            this.#snackBar.open(`Note ${noteDTO.name} Create`);
            this.onUpdate.set(`${noteDTO.createdAt} ${noteDTO.id}`);
          });
        }
      });
  }

  onUpdateNote(noteDTO: NoteDTO) {
    this.#dialog
      .open(UpdateNoteDialog, { data: noteDTO })
      .afterClosed()
      .subscribe(updateNoteDTO => {
        if (updateNoteDTO) {
          console.log(noteDTO)
          this.#notesService.updateNotes(noteDTO.id, updateNoteDTO).subscribe(() => {
            this.#snackBar.open(`Note ${noteDTO.name} Update`);
            this.onUpdate.set(`${noteDTO.createdAt} ${noteDTO.id}`);
          });
        }
      });
  }
  onDeleteNote(noteDTO: NoteDTO) {
    this.#dialog
      .open(DeleteNoteDialog, { data: noteDTO })
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          console.log(noteDTO)
          this.#notesService.deleteNotes(noteDTO.id).subscribe(() => {
            this.#snackBar.open(`Note ${noteDTO.name} Delete`);
            this.onDelete.set(`${noteDTO.createdAt} ${noteDTO.id}`);
          });
        }
      });
  }
}
