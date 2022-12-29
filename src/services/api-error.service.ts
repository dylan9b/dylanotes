import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiErrorService {
    constructor(
        private toastrService: ToastrService
    ) { }

    handleError(error: HttpErrorResponse): void {
        const status = error?.status;
        const priamryError = error?.error?.errors?.error;
        const secondaryError = error?.error?.message;

        const errorMessage = priamryError ? priamryError : secondaryError;
        let config = {} as IndividualConfig;

        switch (status) {
            case 500:
            case 502:
                config = {
                    ...config,
                    toastClass: 'toastr-500-error ngx-toastr'
                };
                this.toastrService.show('Something went wrong with the server', 'Server Error', config);
                break;
            case 400:
            default:
                config = {
                    ...config,
                    toastClass: 'toastr-400-error ngx-toastr'
                };
                this.toastrService.show(errorMessage, 'Invalid Input', config);
                break;
            case 401:
                config = {
                    ...config,
                    toastClass: 'toastr-401-error ngx-toastr'
                };
                this.toastrService.show(errorMessage, 'Unauthenticated', config);
                break;
            case 404:
                config = {
                    ...config,
                    toastClass: 'toastr-404-error ngx-toastr'
                };
                this.toastrService.show(errorMessage, 'Not Found', config);
                break;
        }
    }
}