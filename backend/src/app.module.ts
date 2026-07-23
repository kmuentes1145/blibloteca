// Módulo raíz de la aplicación: importa los módulos 
// de usuarios, libros y préstamos, y configura la conexión a la base de datos.
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuarios/usuario.modules';
import { LibroModule } from './libros/libro.module';
import { PrestamoModule } from './prestamos/prestamo.module';

@Module({
  // Configuración de la base de datos: se usa TypeORM con PostgreSQL,
  // y se cargan las variables de entorno desde un archivo .env.
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    // Módulos de la aplicación: cada uno maneja un conjunto de funcionalidades
    UsuarioModule,
    LibroModule,
    PrestamoModule,
  ],
  // Controlador y servicio raíz: se usan para responder a la ruta "/"
  controllers: [AppController],
  providers: [AppService],
})
// Clase del módulo raíz: NestJS la usa para inicializar la aplicación.
export class AppModule { }
