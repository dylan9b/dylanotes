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

    getNotes(searchTerm?: string): Observable<INoteResponse[]> {
        return this.http.get<{ data: INoteResponse[] }>(`${this.baseUrl}/notes/list`, { params: { searchTerm: searchTerm as string } })
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
                    return response?.data;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }

    postNote(request: INoteRequest): Observable<INoteResponse> {
        return this.http.post<{ data: INoteResponse }>(`${this.baseUrl}/notes/new`, request)
            .pipe(
                map(response => {
                    return response?.data;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }

    putNote(request: INoteRequest): Observable<INoteResponse> {
        return this.http.put<{ data: INoteResponse }>(`${this.baseUrl}/notes/${request?._id}`, request)
            .pipe(
                map(response => {
                    return response?.data;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }

    deleteNote(id: string): Observable<INoteResponse> {
        return this.http.delete<{ data: INoteResponse }>(`${this.baseUrl}/notes/${id}`, { body: { id: id } })
            .pipe(
                map(response => {
                    return response?.data;
                }),
                catchError(error => {
                    throw error;
                })
            )
    }
}