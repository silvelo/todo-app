import { ApiProperty } from '@nestjs/swagger';

export class NotePayload {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty({ enum: ["Personal", "Travel", "Life", "Work"]})
    tags: string;
}