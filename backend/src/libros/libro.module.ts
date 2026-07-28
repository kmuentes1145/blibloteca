-//aqui se define el módulo Libro, que contiene los componentes relacionados con los libros.
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
