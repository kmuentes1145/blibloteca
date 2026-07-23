import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fecha_creacion: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/usuarios';

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(dto: { nombre: string; email: string; password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, dto);
  }
}
