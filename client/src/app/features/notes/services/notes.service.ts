import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NoteDTO } from '../interface/note.dto';
import { NotePayload } from '../interface/note.payload';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  readonly #http = inject(HttpClient)
  readonly #baseUrl = '/notes'


  createNote(notePayload:NotePayload) {
    return this.#http.post<NoteDTO>(this.#baseUrl, notePayload);
  }

  getNotes() {
    return this.#http.get<NoteDTO[]>(this.#baseUrl);
  }

  getNote(noteId: string) {
    return this.#http.get<NoteDTO>(`${this.#baseUrl}/${noteId}`);
  }


  updateNotes(noteId: string, notePayload: NotePayload) {
    return this.#http.put<NoteDTO>(`${this.#baseUrl}/${noteId}`, notePayload);
  }
  
  deleteNotes(noteId: string) {
    return this.#http.delete<NoteDTO>(`${this.#baseUrl}/${noteId}`);
  }

  
  
}
