import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'varchar', length: 100 })
  autor: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  isbn: string;

  // Cuántos ejemplares existen en total de este libro
  @Column({ type: 'int', default: 1 })
  cantidad_total: number;

  // Cuántos ejemplares están libres para prestar ahora mismo
  @Column({ type: 'int', default: 1 })
  cantidad_disponible: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;
}
