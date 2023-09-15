import { Observable, catchError, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { INoteRequest } from 'src/app/notes/item/_models/note-request.model';
import { INoteResponse } from 'src/app/notes/item/_models/note-response.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  baseUrl: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = `${environment.BASE_URL}/api`;
  }

  /**
   * Retrieves the notes based on the search term provided.
   *
   * @param searchTerm - The search term.
   * @returns { Observable<INoteResponse[]> } - An observable array of note item responses.
   */
  getNotes(searchTerm?: string | null): Observable<INoteResponse[]> {
    return this._http
      .get<{ data: INoteResponse[] }>(`${this.baseUrl}/notes/list`, {
        params: { searchTerm: searchTerm as string },
      })
      .pipe(
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  /**
   * Inserts a new note.
   *
   * @param request - The request body.
   * @returns { Observable<INoteResponse> } - The created note.
   */
  postNote(request: INoteRequest): Observable<INoteResponse> {
    return this._http
      .post<{ data: INoteResponse }>(`${this.baseUrl}/notes/new`, request)
      .pipe(
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  /**
   * Updates a note.
   *
   * @param request - The request body.
   * @returns { Observable<INoteResponse> } - The updated note.
   */
  putNote(request: INoteRequest): Observable<INoteResponse> {
    return this._http
      .put<{ data: INoteResponse }>(
        `${this.baseUrl}/notes/${request?._id}`,
        request
      )
      .pipe(
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  /**
   * Soft deletes a note.
   *
   * @param id - The note id.
   * @returns { Observable<INoteResponse> } - The archived note.
   */
  archiveNote(id: string): Observable<INoteResponse> {
    return this._http
      .delete<{ data: INoteResponse }>(`${this.baseUrl}/notes/${id}`, {
        body: { id: id },
      })
      .pipe(
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
}
