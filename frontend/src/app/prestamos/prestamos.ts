import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PrestamoService, Prestamo } from '../prestamo.service';
import { UsuarioService, Usuario } from '../usuario.service';
import { LibroService, Libro } from '../libro.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './prestamos.html',
  styleUrl: './prestamos.css',
})
export class Prestamos implements OnInit {
  private prestamoService = inject(PrestamoService);
  private usuarioService = inject(UsuarioService);
  private libroService = inject(LibroService);

  prestamos = signal<Prestamo[]>([]);
  usuarios = signal<Usuario[]>([]);
  libros = signal<Libro[]>([]);
  error = signal('');
  mensaje = signal('');

  usuarioId: number | null = null;
  libroId: number | null = null;

  ngOnInit() {
    this.cargarPrestamos();
    this.usuarioService.obtenerUsuarios().subscribe({ next: (d) => this.usuarios.set(d) });
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.obtenerLibros().subscribe({ next: (d) => this.libros.set(d) });
  }

  cargarPrestamos() {
    this.prestamoService.obtenerPrestamos().subscribe({
      next: (datos) => this.prestamos.set(datos),
      error: () => this.error.set('Error al obtener los préstamos'),
    });
  }

  registrar() {
    if (!this.usuarioId || !this.libroId) {
      this.error.set('Selecciona un usuario y un libro');
      return;
    }
    this.prestamoService
      .crearPrestamo({ usuarioId: this.usuarioId, libroId: this.libroId })
      .subscribe({
        next: () => {
          this.mensaje.set('Préstamo registrado con éxito');
          this.error.set('');
          this.usuarioId = this.libroId = null;
          this.cargarPrestamos();
          this.cargarLibros(); // refresca los ejemplares disponibles
        },
        error: (err) => this.error.set(err.error?.message || 'Error al registrar préstamo'),
      });
  }

  // Nuevo: registrar la devolución de un préstamo activo
  devolver(id: number) {
    this.prestamoService.devolverPrestamo(id).subscribe({
      next: () => {
        this.mensaje.set('Devolución registrada con éxito');
        this.error.set('');
        this.cargarPrestamos();
        this.cargarLibros(); // el libro vuelve a estar disponible
      },
      error: (err) => this.error.set(err.error?.message || 'Error al registrar la devolución'),
    });
  }
}
