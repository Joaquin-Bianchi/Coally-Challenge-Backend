# Coally Challenge "Backend"
### Este es el repositorio del backend. Ver [repositorio](https://github.com/Joaquin-Bianchi/Coally-Challenge-Frontend) del Frontend

Demo: https://coally-challenge-backend-production.up.railway.app/api-docs/
![image](https://github.com/user-attachments/assets/1d17d133-3b1b-4867-8612-3e9e011c0d56)


## Tecnologías

- Node.js, TypeScript,, JWT, Express para manejo de las peticiones, MongoDB como base de datos Swagger para la documentacion de la API y jest para el testing.

## Instalación

1. Clona el repositorio
2. Instala las dependencias `npm install`
3. Cambia el nombre del archivo .env.template a .env y remplaza las variables de entorno
4. Inicia la aplicacion `npm run dev`
5. Prueba los endpoints en http://localhost:3000/api-docs

## Testing

1. Ejecuta los tests con el comando `npm test`
2. Asegúrate de tener configuradas las variables de entorno necesarias para los tests en el archivo `.env.test`
3. Para generar un reporte de cobertura de tests, utiliza `npm run test:coverage`
