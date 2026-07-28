// este archivo define el controlador UsuarioController, que maneja 
// las solicitudes HTTP relacionadas con los usuarios. 
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Post()
  crear(@Body() dto: CrearUsuarioDto): Promise<Usuario> {
    return this.usuarioService.crear(dto);
  }
}
