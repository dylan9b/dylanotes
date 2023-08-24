import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiErrorService {
  snackBar = inject(MatSnackBar);

  handleError(error: HttpErrorResponse): void {
    const status = error?.status;
    const primaryError = error?.error?.errors?.error;
    const secondaryError = error?.error?.message;

    const errorMessage = primaryError || secondaryError;

    switch (status) {
      case 500:
      case 502:
        this.snackBar.open(
          'Something went wrong with the server.',
          'Server Error'
        );
        break;
      case 400:
      default:
        this.snackBar.open('Input is in an incorrect format.', 'Invalid Input');

        break;
      case 401:
        this.snackBar.open('You are not authenticated.', 'Unauthenticated');
        break;
      case 404:
        this.snackBar.open('Cannot access URL entered.', 'Not found');
        break;
    }
  }
}
