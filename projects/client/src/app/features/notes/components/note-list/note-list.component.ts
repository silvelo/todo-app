import { Component, input, output } from '@angular/core';
import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteDTO } from './../../interface/note.dto';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteItemComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  noteList = input.required<NoteDTO[]>();
  onUpdate = output<NoteDTO>();
  onDelete = output<NoteDTO>();
}
