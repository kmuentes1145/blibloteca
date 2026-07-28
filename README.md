# Biblioteca Virtual 
## Endpoints disponibles

| Método | Ruta        | Descripción                        |
|--------|-------------|-------------------------------------|
| GET    | /usuarios   | Lista usuarios                      |
| POST   | /usuarios   | Crea usuario (nombre, email, password) |
| GET    | /libros     | Lista libros                        |
| POST   | /libros     | Crea libro (titulo, autor, isbn)   |
| GET    | /prestamos  | Lista préstamos (con relaciones)    |
| POST   | /prestamos  | Crea préstamo (usuarioId, libroId) |


- **Error de conexión a la base de datos**: revisa que PostgreSQL esté
  corriendo y que las credenciales en `.env` coincidan.
- **CORS error en el navegador**: confirma que el backend esté corriendo
  con el `main.ts` incluido (tiene `enableCors` hacia el puerto 4200).
- **Puerto ocupado**: si 3000 o 4200 ya están en uso, cierra el proceso
  anterior o cambia el puerto.
# blibloteca
