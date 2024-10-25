import { ApiProperty } from '@nestjs/swagger';

export class NoteDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty({ enum: ["Personal", "Travel", "Life", "Work"]})
    tags: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updateAt: Date;
    @ApiProperty()
    _id: string;
    @ApiProperty()
    _v: number;
}