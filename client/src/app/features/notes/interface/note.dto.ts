import { NoteTag } from '../enums/note-tag';

export interface NoteDTO {
    name: string;
    description: string;
    tags: NoteTag;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}