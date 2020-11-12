import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pessoa } from './pessoa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {


  constructor(
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${environment.apiUrl}/pessoas`)
      .pipe(catchError(this.tratarErro()));
  }

  /** GET heroes from the server */
  getById(pessoaId: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${environment.apiUrl}/pessoa/${pessoaId}`)
      .pipe(catchError(this.tratarErro()));
  }

  create(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${environment.apiUrl}/pessoa`, pessoa)
      .pipe(catchError(this.tratarErro()));
  }

  update(pessoaId: string, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${environment.apiUrl}/pessoa/${pessoaId}`, pessoa)
      .pipe(catchError(this.tratarErro()));
  }

  delete(pessoaId: string): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${environment.apiUrl}/pessoa/${pessoaId}`)
      .pipe(catchError(this.tratarErro()));
  }


  private tratarErro() {
    return (error: any) => {
      console.error(error);
      return EMPTY;
    };
  }

}
