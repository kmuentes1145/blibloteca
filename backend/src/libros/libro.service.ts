//aqui se define el servicio Libro, que contiene la lógica de negocio relacionada con los libros.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
import { CrearLibroDto } from './dto/crear-libro.dto';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ) { }

  findAll(): Promise<Libro[]> {
    return this.libroRepository.find();
  }

  // Al crear, cantidad_disponible arranca igual a cantidad_total
  crear(dto: CrearLibroDto): Promise<Libro> {
    const libro = this.libroRepository.create({
      ...dto,
      cantidad_disponible: dto.cantidad_total,
    });
    return this.libroRepository.save(libro);
  }
}
