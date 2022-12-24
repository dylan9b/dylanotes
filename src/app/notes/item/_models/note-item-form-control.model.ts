import { FormControl, Validators } from '@angular/forms';

export class NotesItemFormControl {
    constructor(
        public id: FormControl = new FormControl(null, [Validators.required]),
        public title: FormControl = new FormControl(null, [Validators.required]),
        public body: FormControl = new FormControl(null, [Validators.required])
    ) { }
}