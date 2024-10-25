import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NoteDTO } from '../interface/note.dto';
import { NotePayload } from '../interface/note.payload';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  #http = inject(HttpClient)


  createNote(notePayload:NotePayload) {
    return this.#http.post<NoteDTO>('http://localhost:3000/api/notes', notePayload);
  }

  getNotes() {
    return this.#http.get<NoteDTO[]>('http://localhost:3000/api/notes');
  }

  getNote(noteId: string) {
    return this.#http.get<NoteDTO>(`http://localhost:3000/api/notes/${noteId}`);
  }


  updateNotes(noteId: string, notePayload: NotePayload) {
    return this.#http.put<NoteDTO>(`http://localhost:3000/api/notes/${noteId}`, notePayload);
  }
  
  deleteNotes(noteId: string) {
    return this.#http.delete<NoteDTO>(`http://localhost:3000/api/notes/${noteId}`);
  }

  
  
}
