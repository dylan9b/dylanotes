import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiErrorService } from '@services/api-error.service';
import { tap } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _apiErrorService: ApiErrorService,
    private readonly _snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          this._apiErrorService.handleError(error);

          this._snackBar.open(error?.statusText, 'Error', {
            panelClass: 'status__500',
          });
        },
      })
    );
  }
}
