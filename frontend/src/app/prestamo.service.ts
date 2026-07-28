// Este archivo define un servicio de Angular llamado `PrestamoService`
// que se encarga de interactuar con una API para gestionar préstamos de libros en una biblioteca virtual. 
// El servicio utiliza `HttpClient` para realizar solicitudes HTTP y 
// proporciona métodos para obtener la lista de préstamos, crear un nuevo préstamo y registrar la devolución de un préstamo.
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.service';
import { Libro } from './libro.service';

export interface Prestamo {
  id: number;
  usuario: Usuario;
  libro: Libro;
  fecha_prestamo: string;
  fecha_devolucion: string | null;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class PrestamoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/prestamos';

  obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  crearPrestamo(dto: { usuarioId: number; libroId: number }): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, dto);
  }

  // Nuevo: registrar devolución de un préstamo
  devolverPrestamo(id: number): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/${id}/devolver`, {});
  }
}
