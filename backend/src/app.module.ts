import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import "dotenv/config";
import { NoteModule } from './notes/notes.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI),
    NoteModule
  ],
})
export class AppModule { }