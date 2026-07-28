// Este archivo define un servicio de Angular llamado `UsuarioService`
// que se encarga de interactuar con una API para gestionar usuarios en una biblioteca virtual. 
// El servicio utiliza `HttpClient` para realizar solicitudes HTTP y 
// proporciona métodos para obtener la lista de usuarios y crear un nuevo usuario.
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
