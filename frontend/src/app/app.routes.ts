import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Libros } from './libros/libros';
import { Prestamos } from './prestamos/prestamos';

export const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: Dashboard },
  { path: 'libros', component: Libros },
  { path: 'prestamos', component: Prestamos },
];
