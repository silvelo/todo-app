import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { NoteBase } from './interfaces/note.interface';
import { NotePayload } from './interfaces/note.payload';
import { NoteService } from './note.service';


@Injectable()
export class NoteMemoryService implements NoteService {
    private notes: NoteBase[] = [];

    async createANote(notePayload: NotePayload): Promise<NoteBase> {
        const newNote: NoteBase = {
            id: uuidv4(),
            ...notePayload,
            createdAt: new Date(),
            updatedAt: new Date() // Asignamos la fecha actual a updatedAt al crear
        };
        this.notes.push(newNote);
        return newNote;
    }

    async getAllNotes(): Promise<NoteBase[]> {
        return this.notes;
    }

    async getNote(noteID: string): Promise<NoteBase> {
        const note = this.notes.find(note => note.id === noteID);
        if (!note) throw new NotFoundException('Note not found');
        return note;
    }

    async updateNote(noteID: string, notePayload: NotePayload): Promise<NoteBase> {
        const noteIndex = this.notes.findIndex(note => note.id === noteID);
        if (noteIndex === -1) throw new NotFoundException('Note not found');

        const updatedNote = {
            ...this.notes[noteIndex],
            ...notePayload,
            updatedAt: new Date() // Actualizamos la fecha de updatedAt al modificar la nota
        };
        this.notes[noteIndex] = updatedNote;
        return updatedNote;
    }

    async deleteNote(noteID: string): Promise<NoteBase> {
        const noteIndex = this.notes.findIndex(note => note.id === noteID);
        if (noteIndex === -1) throw new NotFoundException('Note not found');

        const [deletedNote] = this.notes.splice(noteIndex, 1);
        return deletedNote;
    }
}
