import { FormGroup } from '@angular/forms';

export class NotesItemValidation {
  constructor(private readonly _form: FormGroup) {}

  INPUT = {
    TITLE: 'title',
    BODY: 'body',
  };

  isTitleInvalid(): boolean | undefined {
    return (
      this._form?.get(this.INPUT?.TITLE)?.invalid &&
      (this._form?.get(this.INPUT?.TITLE)?.touched ||
        this._form?.get(this.INPUT?.TITLE)?.dirty)
    );
  }

  isBodyInvalid(): boolean | null {
    return (this._form?.get(this.INPUT?.BODY)?.invalid &&
      (this._form?.get(this.INPUT?.BODY)?.touched ||
        this._form?.get(this.INPUT?.BODY)?.dirty)) as boolean | null;
  }
}
