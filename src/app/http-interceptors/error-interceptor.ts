import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorService } from '@services/api-error.service';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _apiErrorService: ApiErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          this._apiErrorService.handleError(error);
        },
      })
    );
  }
}
