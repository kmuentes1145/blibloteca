import { Controller, Get, Post, Body } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { Libro } from './libro.entity';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  @Post()
  crear(@Body() dto: CrearLibroDto): Promise<Libro> {
    return this.libroService.crear(dto);
  }
}
