import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { INoteRequest } from "src/app/notes/item/_models/note-request.model";
import { INoteResponse } from "src/app/notes/item/_models/note-response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class NoteService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.BASE_URL}/api`
    }

    getNotes(): Observable<INoteResponse[]> {
        return this.http.get<{ data: INoteResponse[] }>(`${this.baseUrl}/notes/list`)
            .pipe(
                map(response => {
                    return response?.data;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }

    getNote(id: string): Observable<INoteResponse> {
        return this.http.get<{ data: INoteResponse }>(`${this.baseUrl}/notes/${id}`)
            .pipe(
                map(response => {
                    debugger;
                    return response?.data;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }

    postNote(request: INoteRequest): Observable<INoteResponse> {
        return this.http.post(`${this.baseUrl}/notes/new`, request)
            .pipe(
                map(response => {
                    return response as INoteResponse;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }

    deleteNote(id: string): Observable<INoteResponse> {
        return this.http.delete(`${this.baseUrl}/notes/${id})`)
            .pipe(
                map(response => {
                    return response as INoteResponse;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }
}