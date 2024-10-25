import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note } from './interfaces/note.interface';
import { NotePayload } from './interfaces/note.payload';


@Injectable()
export class NoteService {
    constructor(@InjectModel("Note") private readonly noteModel: Model<Note>) { }
    
    async createANote(notePayload: NotePayload): Promise<Note> {
        const createdNote = new this.noteModel(notePayload);
        return createdNote.save();
    }

    async getAllNotes(): Promise<Note[]> {
        const notes = await this.noteModel.find().exec();
        return notes;
    }

    async getNote(noteID: string): Promise<Note> {
        const note = await this.noteModel.findById(noteID).exec();
        return note;
    }

    async updateNote(
        noteID: string,
        notePayload: NotePayload
    ): Promise<Note> {
        const updatedNote = await this.noteModel.findByIdAndUpdate
        (noteID, notePayload, { new: true });
        return updatedNote;
    }

    async deleteNote(noteID: string): Promise<Note> {
        const deletedNote = await this.noteModel.findByIdAndDelete(noteID);
        return deletedNote;
    }
}