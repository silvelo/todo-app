import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NoteDocument } from './interfaces/note.interface';
import { NotePayload } from './interfaces/note.payload';
import { NoteService } from './note.service';



@Injectable()
export class NoteMongooseService implements NoteService{
    constructor(@InjectModel("Note") private readonly noteModel: Model<NoteDocument>) { }
    
    async createANote(notePayload: NotePayload): Promise<NoteDocument> {
        const createdNote = new this.noteModel(notePayload);
        return createdNote.save();
    }

    async getAllNotes(): Promise<NoteDocument[]> {
        const notes = await this.noteModel.find().exec();
        return notes;
    }

    async getNote(noteID: string): Promise<NoteDocument> {
        const note = await this.noteModel.findById(noteID).exec();
        return note;
    }

    async updateNote(
        noteID: string,
        notePayload: NotePayload
    ): Promise<NoteDocument> {
        const updatedNote = await this.noteModel.findByIdAndUpdate
        (noteID, notePayload, { new: true });
        return updatedNote;
    }

    async deleteNote(noteID: string): Promise<NoteDocument> {
        const deletedNote = await this.noteModel.findByIdAndDelete(noteID);
        return deletedNote;
    }
}