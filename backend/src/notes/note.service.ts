
import { NoteBase } from './interfaces/note.interface';
import { NotePayload } from './interfaces/note.payload';


export interface NoteService {
    createANote(notePayload: NotePayload): Promise<NoteBase>;
    getAllNotes(): Promise<NoteBase[]>;
    getNote(noteID: string): Promise<NoteBase>;
    updateNote(noteID: string, notePayload: NotePayload): Promise<NoteBase>;
    deleteNote(noteID: string): Promise<NoteBase>;
}