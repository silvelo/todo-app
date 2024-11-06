
export interface NoteBase {
    readonly id?: string; // Añadimos id opcional para el servicio en memoria
    readonly name: string;
    readonly description: string;
    readonly tags: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

import { Document } from "mongoose";

export type NoteDocument = NoteBase & Document;
