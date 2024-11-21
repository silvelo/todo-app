import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoteDTO } from '../../interface/note.dto';


@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [MatIconModule, DatePipe, MatButtonModule],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.css',
})
export class NoteItemComponent {
  note = input.required<NoteDTO>();
  onUpdate = output<NoteDTO>();
  onDelete = output<NoteDTO>();
}
