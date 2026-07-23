import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroService, Libro } from '../libro.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './libros.html',
  styleUrl: './libros.css',
})
export class Libros implements OnInit {
  private libroService = inject(LibroService);

  libros = signal<Libro[]>([]);
  error = signal('');
  mensaje = signal('');

  titulo = '';
  autor = '';
  isbn = '';
  cantidadTotal = 1;

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.obtenerLibros().subscribe({
      next: (datos) => this.libros.set(datos),
      error: () => this.error.set('Error al obtener los libros'),
    });
  }

  registrar() {
    if (!this.titulo || !this.autor || !this.isbn || !this.cantidadTotal || this.cantidadTotal < 1) {
      this.error.set('Completa todos los campos (cantidad mínima: 1)');
      return;
    }
    this.libroService
      .crearLibro({
        titulo: this.titulo,
        autor: this.autor,
        isbn: this.isbn,
        cantidad_total: this.cantidadTotal,
      })
      .subscribe({
        next: () => {
          this.mensaje.set('Libro registrado con éxito');
          this.error.set('');
          this.titulo = this.autor = this.isbn = '';
          this.cantidadTotal = 1;
          this.cargarLibros();
        },
        error: () => this.error.set('Error al registrar libro'),
      });
  }
}
