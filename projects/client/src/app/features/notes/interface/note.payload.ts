import { FormControl } from '@angular/forms';
import { NoteTag } from '../enums/note-tag';

export interface NotePayload {
    name: string;
    description: string;
    tags: NoteTag;    
}

export interface NotePayloadForm {
    name: FormControl<string>;
    description: FormControl<string>;
    tags: FormControl<NoteTag>;
}

