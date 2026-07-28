// este archivo define la entidad Usuario, que representa a un usuario en la base de datos.
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

//  indica que esta clase es una entidad de la base de datos
//  y se mapeará a la tabla 'usuarios'
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;
}
