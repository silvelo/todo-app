import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from './notes.controller';
import { NoteService } from './notes.service';
import { NoteSchema } from './schemas/note.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])
    ],
    controllers: [NoteController],
    providers: [NoteService]
})
export class NoteModule { }