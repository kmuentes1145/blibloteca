// Este archivo define un módulo de NestJS llamado `LibroModule` que se encarga de gestionar la funcionalidad relacionada con los libros en una biblioteca virtual.
// El módulo importa `TypeOrmModule` para interactuar con la base de datos a través de la entidad `Libro`.
// Además, proporciona el servicio `LibroService` y el controlador `LibroController` para manejar la lógica de negocio y las rutas HTTP relacionadas con los libros.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro.entity';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule { }
