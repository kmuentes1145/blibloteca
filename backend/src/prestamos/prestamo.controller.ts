// Controlador de préstamos: define las rutas y métodos para manejar
// las operaciones de préstamos de libros.
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CrearPrestamoDto } from './dto/crear-prestamo.dto';
import { Prestamo } from './prestamo.entity';
// Controlador de préstamos: define las rutas y métodos para manejar
// las operaciones de préstamos de libros.
@Controller('prestamos')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) { }

  @Get()
  findAll(): Promise<Prestamo[]> {
    return this.prestamoService.findAll();
  }

  @Post()
  crear(@Body() dto: CrearPrestamoDto): Promise<Prestamo> {
    return this.prestamoService.crear(dto);
  }

  // Devolver un préstamo: PUT /prestamos/5/devolver
  @Put(':id/devolver')
  devolver(@Param('id', ParseIntPipe) id: number): Promise<Prestamo> {
    return this.prestamoService.devolver(id);
  }
}
