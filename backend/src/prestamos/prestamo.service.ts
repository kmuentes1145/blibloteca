import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from './prestamo.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Libro } from '../libros/libro.entity';
import { CrearPrestamoDto } from './dto/crear-prestamo.dto';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ) {}

  findAll(): Promise<Prestamo[]> {
    return this.prestamoRepository.find();
  }

  async crear(dto: CrearPrestamoDto): Promise<Prestamo> {
    const usuario = await this.usuarioRepository.findOneBy({ id: dto.usuarioId });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const libro = await this.libroRepository.findOneBy({ id: dto.libroId });
    if (!libro) throw new NotFoundException('Libro no encontrado');

    // Ahora valida contra el CONTADOR de ejemplares, no contra un booleano
    if (libro.cantidad_disponible <= 0) {
      throw new BadRequestException('No hay ejemplares disponibles de este libro');
    }

    libro.cantidad_disponible -= 1;
    await this.libroRepository.save(libro);

    const prestamo = this.prestamoRepository.create({ usuario, libro });
    return this.prestamoRepository.save(prestamo);
  }

  // Registrar la devolución de un préstamo: libera un ejemplar del libro
  async devolver(id: number): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOneBy({ id });
    if (!prestamo) throw new NotFoundException('Préstamo no encontrado');
    if (prestamo.estado === 'devuelto') {
      throw new BadRequestException('Este préstamo ya fue devuelto');
    }

    prestamo.estado = 'devuelto';
    prestamo.fecha_devolucion = new Date();
    await this.prestamoRepository.save(prestamo);

    const libro = await this.libroRepository.findOneBy({ id: prestamo.libro.id });
    if (libro) {
      libro.cantidad_disponible += 1;
      await this.libroRepository.save(libro);
    }

    return prestamo;
  }
}
