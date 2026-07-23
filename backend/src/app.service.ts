// Servicio raíz: contiene la lógica de negocio mínima para responder a la ruta "/".
import { Injectable } from '@nestjs/common';
// El decorador @Injectable() indica que esta clase puede ser inyectada como dependencia en otros componentes de NestJS.
@Injectable()
export class AppService {
  getHello(): string {
    return 'API Biblioteca Virtual funcionando correctamente';
  }
}
