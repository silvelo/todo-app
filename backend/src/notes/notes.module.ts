import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NoteMongooseService } from './note-mongoose.service';
import { NoteMemoryService } from './notes-memory.service';
import { NoteController } from './notes.controller';
import { NoteSchema } from './schemas/note.schema';

const noteServiceProvider = {
  provide: 'NoteService',
  useClass:
    process.env.USE_MEMORY_DB === 'true'
      ? NoteMemoryService
      : NoteMongooseService,
};

@Module({
  imports:
    process.env.NODE_ENV === 'production'
      ? [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])]
      : [],
  controllers: [NoteController],
  providers: [noteServiceProvider],
  exports: ['NoteService'],
})
export class NoteModule {}
