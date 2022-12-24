import { FormGroup } from '@angular/forms';

export class NotesItemValidation {

    constructor(private form: FormGroup) { }

    INPUT = {
        TITLE: 'title',
        BODY: 'body'
    }

    isTitleInvalid(): boolean | undefined {
        return (this.form?.get(this.INPUT?.TITLE)?.invalid &&
            (this.form?.get(this.INPUT?.TITLE)?.touched
                || this.form?.get(this.INPUT?.TITLE)?.dirty)
        );
    }

    isBodyInvalid(): boolean | null {
        return (this.form?.get(this.INPUT?.BODY)?.invalid &&
            (this.form?.get(this.INPUT?.BODY)?.touched
                || this.form?.get(this.INPUT?.BODY)?.dirty)
        ) as boolean | null;
    }
}