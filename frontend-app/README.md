# Frontend

## Comenzando

Para poder hacer funcionar este proyecto es necesario cumplir con los siguientes prerrequisitos:

### Prerrequisitos

- **Dependencias**
Para instalar las dependencias es necesario ejecutar desde el directorio `frontend-app`:

```sh
npm install
```

- **Variables de entorno**
Para la construcción de las variables de entorno se dejó el archivo [env.template](https://github.com/Elias288/Gym_App/blob/master/frontend-app), es necesario que se renombre a `.env` para que se pueda usar e ingresar los datos necesarios

  - EXPO_PUBLIC_DEVELOP: una variable booleana utilzada para ver el log
  - EXPO_PUBLIC_API_URL: la URL de la API

- **Compilación**
Ahora dependiendo de en que dispositivo se utilzará se puede ejecutar:

```sh
npm run android
# o
npm run ios
```

### Ejecución

Finalmente para ejecutar el proyecto:

```sh
npm start
```

### Creación del Proyecto

Pasos para la creación de este proyecto desde cero: [Guia de creación](https://github.com/Elias288/Gym_App/blob/master/frontend-app/CREACION.md)
