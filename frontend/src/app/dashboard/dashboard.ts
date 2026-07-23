import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../usuario.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  private usuarioService = inject(UsuarioService);

  usuarios = signal<Usuario[]>([]);
  error = signal('');
  mensaje = signal('');

  nombre = '';
  email = '';
  password = '';

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (datos) => this.usuarios.set(datos),
      error: () => this.error.set('Error al obtener los usuarios'),
    });
  }

  registrar() {
    if (!this.nombre || !this.email || !this.password) {
      this.error.set('Completa todos los campos');
      return;
    }
    this.usuarioService
      .crearUsuario({ nombre: this.nombre, email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.mensaje.set('Usuario registrado con éxito');
          this.error.set('');
          this.nombre = this.email = this.password = '';
          this.cargarUsuarios();
        },
        error: () => this.error.set('Error al registrar usuario'),
      });
  }
}
