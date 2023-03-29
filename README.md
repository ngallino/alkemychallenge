<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Documentacion.
Opcional
```
Crear una EC2, instalar Docker, Visual Studio Code, Git.
```
Necesario
1. Descargar el proyecto del Bucket S3 de AWS
2. Abrir el la carpeta del proyecto y una terminal en ella.
3. Ejecutar
```
yarn install
```
4. Levantar la imagen (Docker desktop)
```
docker-compose up -d
```

5. Levantar el backend de Nest
```
yarn start:dev
```

6. Visiar el sitio
```
localhost:3000/graphql
```

7. Crear al menos un Usuario, guardar su jwt token para utilizarlo mas adelante.

8. Crear Reclamos para luego poder manipularlos.

```
Para utilizar el modulo de reclamos es necesario estar autenticado, 
por lo tanto es necesario la creacion de un usuario, 
a travez del modulo users y utilizar el token correspondiente.
```

# Funcionalidades

- El modulo de 'reclamos' permite Crear, Modificar, buscar todos los reclamos, buscar reclamo por titulo y eliminar reclamos.

- El modulo files se encarga de la carga de imagenes.

- El modulo auth se encarga de la Autentificacion y Autorizacion de la Api.

- El modulo users esta relacionado con el modulo de auth y se encarga de gestionar los Usuarios.

- Los modulos de reclamos y usuarios son GraphQl API. 

- El modulo common contiene archivos relevantes para la paginacion 


# Pruebas

- Se probo el correcto funcionamiento de el modulo de reclamos, en el cual podemos utilizar todas las funciones estando       identificados y autorizados para usarlas.

- La autorizacion y autentificacion funcionan correctamente. Implementan JWT y Bycrypt para almacenar datos de forma segura. 

- La carga de imagenes funciona y corrobora que estas sean imagenes como tal y no archivos maliciosos. 

- Los reclamos se alacenan en la base de datos postgres utilizando Docker. 


El repositorio de la Api esta alojada tanto en GITHUB y en un S3 de AWS.

```
Nicolas Gallino
```