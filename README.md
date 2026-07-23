# Biblioteca Virtual - Microservicios

Aplicación web de gestión de biblioteca virtual con 3 microservicios:
**Usuarios**, **Libros** y **Préstamos**.

- Backend: NestJS + TypeORM + PostgreSQL (puerto 3000)
- Frontend: Angular standalone, signals, rutas (puerto 4200)

Este es un proyecto completo, listo para instalar y correr. No necesitas
tener nada previo, solo Node.js instalado.

---

## Requisitos previos

- Node.js 18 o superior (`node -v` para comprobar)
- PostgreSQL instalado y corriendo, **o** Docker (te doy las dos opciones abajo)

---

## Paso 1 — Base de datos PostgreSQL

### Opción A: ya tienes PostgreSQL instalado
Crea una base de datos vacía llamada `biblioteca_virtual` (puedes usar pgAdmin
o la consola `psql`):
```sql
CREATE DATABASE biblioteca_virtual;
```

### Opción B: no tienes PostgreSQL, usa Docker
En la raíz del proyecto:
```bash
docker compose up -d
```
Esto levanta PostgreSQL en el puerto 5432 con usuario `postgres`,
contraseña `postgres` y base de datos `biblioteca_virtual` ya creada.

---

## Paso 2 — Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env
```

Abre `.env` y ajusta las credenciales si tu PostgreSQL es distinto al de
`docker-compose.yml` (usuario, contraseña, host, puerto, nombre de base).

Levanta el servidor:
```bash
npm run start:dev
```

Deberías ver en consola algo como:
```
[Nest] LOG [InstanceLoader] UsuarioModule dependencies initialized
[Nest] LOG [InstanceLoader] LibroModule dependencies initialized
[Nest] LOG [InstanceLoader] PrestamoModule dependencies initialized
[Nest] LOG [RouterExplorer] Mapped {/usuarios, GET} route
[Nest] LOG [RouterExplorer] Mapped {/libros, GET} route
[Nest] LOG [RouterExplorer] Mapped {/prestamos, GET} route
```

El backend queda corriendo en **http://localhost:3000**.
Como `synchronize: true` está activo, TypeORM crea automáticamente las
tablas `usuarios`, `libros` y `prestamos` en tu base de datos.

---

## Paso 3 — Frontend (Angular)

En otra terminal:
```bash
cd frontend
npm install
npm start
```

Esto corre `ng serve` y abre el frontend en **http://localhost:4200**.
Verás un menú superior con **Usuarios / Libros / Préstamos**.

---

## Paso 4 — Probar con Postman

Importa el archivo `postman/Biblioteca-Virtual.postman_collection.json`
en Postman (botón **Import**).

Orden recomendado de pruebas:
1. **Crear Usuario** (POST /usuarios)
2. **Crear Libro** (POST /libros)
3. **Crear Prestamo** (POST /prestamos) usando los `id` que te devolvieron
   los pasos anteriores (`usuarioId`, `libroId`)
4. **Listar Libros** (GET /libros) — el libro prestado debe quedar con
   `disponible: false`
5. **Listar Prestamos** (GET /prestamos) — verás el historial completo

---

## Estructura del proyecto

```
biblioteca-app/
├── backend/                  → API NestJS
│   └── src/
│       ├── usuarios/         → entity, service, controller, module, dto
│       ├── libros/           → entity, service, controller, module, dto
│       ├── prestamos/        → entity, service, controller, module, dto
│       ├── app.module.ts
│       └── main.ts           → CORS habilitado hacia localhost:4200
├── frontend/                 → App Angular
│   └── src/app/
│       ├── dashboard/        → página Usuarios
│       ├── libros/           → página Libros
│       ├── prestamos/        → página Préstamos
│       ├── usuario.service.ts / libro.service.ts / prestamo.service.ts
│       └── app.routes.ts     → rutas /usuarios /libros /prestamos
├── postman/                  → colección lista para importar
└── docker-compose.yml        → PostgreSQL opcional
```

## Endpoints disponibles

| Método | Ruta        | Descripción                        |
|--------|-------------|-------------------------------------|
| GET    | /usuarios   | Lista usuarios                      |
| POST   | /usuarios   | Crea usuario (nombre, email, password) |
| GET    | /libros     | Lista libros                        |
| POST   | /libros     | Crea libro (titulo, autor, isbn)   |
| GET    | /prestamos  | Lista préstamos (con relaciones)    |
| POST   | /prestamos  | Crea préstamo (usuarioId, libroId) |

## Problemas comunes

- **Error de conexión a la base de datos**: revisa que PostgreSQL esté
  corriendo y que las credenciales en `.env` coincidan.
- **CORS error en el navegador**: confirma que el backend esté corriendo
  con el `main.ts` incluido (tiene `enableCors` hacia el puerto 4200).
- **Puerto ocupado**: si 3000 o 4200 ya están en uso, cierra el proceso
  anterior o cambia el puerto.
# blibloteca
