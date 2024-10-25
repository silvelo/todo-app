import { Document } from "mongoose";

export interface Note extends Document {
    readonly name: string;
    readonly description: string;
    readonly tags: string;
    readonly createdAt: Date;
}