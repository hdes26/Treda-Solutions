
# Prueba Técnica Treda Solutions - Hernán Escorcia

_Esta prueba fue realizada utilizando las tecnologías NestJS, Docker, Swagger, Sequelize y PostgreSQL._

## Nota

Se ha decidido excluir el archivo `.env` de `.gitignore` con el objetivo de facilitar la evaluación de la prueba y asegurar que el entorno de desarrollo esté correctamente configurado.

## Diseño del Diagrama Entidad-Relación 📝

A continuación, se muestra el diagrama de entidad-relación que ilustra las principales entidades y sus relaciones dentro del sistema:

![Diagrama Entidad-Relación](https://github.com/hdes26/Treda-Solutions/blob/main/src/assets/er-treda.drawio.png)

## Diseño de Clean Code 📜

El proyecto sigue principios de **Clean Code** para garantizar una base de código mantenible, comprensible y eficiente. El siguiente diagrama muestra los enfoques clave utilizados para asegurar la calidad del código:

![Diagrama Explicación Clean Code](https://github.com/hdes26/Treda-Solutions/blob/main/src/assets/cleancode.webp)

## Instalación 🔧

Siga los pasos a continuación para configurar y ejecutar el proyecto en su entorno local.

### 1. Clonar el repositorio

Primero, clone el repositorio en su máquina local:

```bash
git clone https://github.com/hdes26/Treda-Solutions.git
```

### 2. Inicializar el contenedor de Docker

A continuación, inicialice los contenedores de Docker para levantar el entorno de desarrollo:

```bash
docker-compose up
```

Este comando iniciará los servicios necesarios, como la base de datos PostgreSQL y el backend del sistema.

## Base de Datos Preconfigurada 💾

La base de datos está preconfigurada con datos iniciales gracias a los seeders implementados. Los siguientes datos están disponibles desde el inicio:

1. **Roles**:
   - `ADMIN`: Rol con acceso completo al sistema.
   - `CUSTOMER`: Rol con permisos básicos para realizar compras.

2. **Categorías**:
   - Se han creado dos categorías iniciales para ilustrar el funcionamiento de la base de datos.

3. **Usuarios**:
   - **Admin User**:
     - **Correo**: `admin@treda.com`
     - **Contraseña**: `Qwerty123*`
     - Asociado al rol `ADMIN`.
   - **Customer User**:
     - **Correo**: `customer@treda.com`
     - **Contraseña**: `Qwerty123*`
     - Asociado al rol `CUSTOMER`.

Esto permite probar el sistema de inmediato sin nece  sidad de crear los datos manualmente.

## Imagen Docker 🐳

La imagen Docker del servidor se encuentra disponible en Docker Hub. Para obtenerla, utilice el siguiente comando:
Quiero destacar que hace falta levantar una base de datos datos para poder usar esta imagen.

```bash
docker pull hdes26/treda-solution-prueba-server:latest
```

## Diferencias entre la Rama `main` y la Rama `v2` 🔄

### Rama `main`
La rama `main` contiene una aplicación funcional que implementa las bases de la solución. Esta versión de la aplicación es el resultado de mi experiencia adquirida a lo largo del tiempo. Aunque es completamente funcional, la arquitectura y los principios de Clean Code no son tan estrictos como en la rama `v2`.

### Rama `v2`
En la rama `v2` encontrarás una versión más robusta y mejor estructurada de la aplicación. Esta rama aplica de manera más estricta los principios de Clean Code y presenta una arquitectura más escalable y modular. Aún no está completamente terminada, pero representa un enfoque más maduro en la construcción de software.

## Recursos 🔗

- [Repositorio en GitHub](https://github.com/hdes26/Treda-Solutions)
