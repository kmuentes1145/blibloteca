import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  cantidad_total: number;
  cantidad_disponible: number;
}

@Injectable({ providedIn: 'root' })
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/libros';

  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  crearLibro(dto: { titulo: string; autor: string; isbn: string; cantidad_total: number }): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, dto);
  }
}
