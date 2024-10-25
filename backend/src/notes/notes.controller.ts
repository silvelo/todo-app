import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteDTO } from './dto/note.dto';
import { NotePayload } from './interfaces/note.payload';
import { NoteService } from './notes.service';

@Controller('notes')
@ApiTags('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a note' })
  @ApiResponse({    type: NoteDTO,  })
  async createANote(@Res() res, @Body() notePayload: NotePayload){
    const note = await this.noteService.createANote(notePayload);
    return res.status(HttpStatus.CREATED).json(note);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({    type: NoteDTO, isArray: true,  })
  async getAllNotes(@Res() res) {
    const notes = await this.noteService.getAllNotes();
    return res.status(HttpStatus.OK).json(notes);
    
  }

  @Get(':noteId')
  @ApiOperation({ summary: 'Get a note' })
  @ApiResponse({    type: NoteDTO,  })
  async getANote(@Res() res, @Param('noteId') _id: string): Promise<NoteDTO> {
    const note = await this.noteService.getNote(_id);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json(note);
  }

  @Put(':noteId')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({    type: NoteDTO,  })
  async updateCustomer(
    @Res() res,
    @Body() notePayload: NotePayload,
    @Param('noteId') _id: string,
  ): Promise<NoteDTO> {
    const note = await this.noteService.updateNote(_id, notePayload);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json(note);
  }

  @Delete(':noteId')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({    type: NoteDTO,  })
  async deleteCustomer(@Res() res, @Param('noteId') _id):Promise<NoteDTO> {
    const note = await this.noteService.deleteNote(_id);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json(note);
  }
}
