import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './prestamo.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Libro } from '../libros/libro.entity';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, Usuario, Libro])],
  providers: [PrestamoService],
  controllers: [PrestamoController],
})
export class PrestamoModule {}
