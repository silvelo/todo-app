import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteTag } from '../enums/note-tag';
import { NotePayloadForm } from '../interface/note.payload';
import { NotePayload } from './../interface/note.payload';

export class NoteConvertTo {
  static notePayloadToForm(notePayload?: NotePayload) {
    return new FormGroup<NotePayloadForm>({
      name: new FormControl<string>(notePayload?.name ?? '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: new FormControl<string>(notePayload?.description ?? '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      tags: new FormControl<NoteTag>(notePayload?.tags ?? NoteTag.Life, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
}
