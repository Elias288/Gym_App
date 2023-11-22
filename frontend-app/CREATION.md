# Guia de creación

## Preparando entorno de trabajo

Crear proyecto React Native:

```sh
npx create-expo-app -t expo-template-blank-typescript frontend-app
```

Instalando y configurando EAS:

```sh
npm install -g eas-cli
eas build:configure
```

---

## Configuración básicas

### Dependencias

Instalación las dependencias básicas:

```sh
npm i react-native-paper @react-native-async-storage/async-storage expo-constants @react-native-community/netinfo
```

### Nombre de proyecto

Cambiar el nombre del proyecto:

abrir: `android/app/src/main/res/values/string.xml`
editar: `<string name="app_name">YOUR_APP_NAME</string>`
ejecutar:

```sh
cd android
./gradlew clean
```

### Variables de entorno

Instalar react-native-dotenv

```sh
npm install -D react-native-dotenv
```

editar: babel.config.js
agregar:

```ts
...
plugins: [
    ["module:react-native-dotenv", { moduleName: "@env", path: "." }],
],
```

crear archivo `env.d.ts`

```ts
declare module '@env' {
    export const <nameVar>: <type>;
}
```

importar

```ts
import {<nameVar>} from "@env"
```

---

## Construir y ejecutar proyecto

```sh
# Construir y ejecutar el proyecto:
npm install --save-dev sharp-cli
npx expo prebuild
npx expo run:android
```
