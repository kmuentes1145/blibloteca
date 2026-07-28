//este archivo define la entidad Prestamo, que representa un préstamo de libro en la aplicación.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Libro } from '../libros/libro.entity';

@Entity('prestamos')
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @ManyToOne(() => Libro, { eager: true })
  libro: Libro;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_prestamo: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_devolucion: Date;

  @Column({ type: 'varchar', length: 20, default: 'activo' })
  estado: string;
}
