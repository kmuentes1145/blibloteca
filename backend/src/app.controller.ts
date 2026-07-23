// Controlador raíz: solo responde en la ruta "/" para confirmar que
// la API está viva (útil para probar rápido en el navegador).
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Inyección de dependencias: NestJS crea automáticamente una
  // instancia de AppService y la pasa aquí.
  constructor(private readonly appService: AppService) { }

  @Get()  // responde a peticiones GET 
  getHello(): string {
    return this.appService.getHello();
  }
}
