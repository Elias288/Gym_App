# GYM App

## Descripción

Aplicación movil en React Native que permita llevar un registro y control de rutinas de ejercicios, pesos que se estén levantando, estado del usuario (peso, altura, etc.).
Esto se llevará a cabo utilizando "Rutinas", estas rutinas contendrán:

- Nombre que lo identifique
- Días de una semana

en los días de la semana una lista de ejercicios, cada ejercicio contendrá:

- Nombre del ejercicio
- Cantidad de repeticions (cantidad de veces que se realiza el ejercicio)
- Cantidad de series (veces que se hacen las repeticiones)

Un usuario puede tener más de una rutina cargada pero solamente una activa, esto implica que al iniciar la aplicación se muestre el contenido de la rutina activa. Esto implica que un usuario debe poder crear una rutina, modificarla, eliminarla y activarla. Se deben almacenar tanto en local como en remoto utilizando una api.

![Diagrama BD](../gym-app/assets/gymDiagram.drawio.png)

## Requerimientos

- Usuario:
  - [ ] Creación de Usuario
  - [ ] Login
  - [ ] Ver información
- Rutina:
  - [ ] Creación de Rutina
  - [ ] Visualizar Rutina
  - [ ] Modificación de Rutina
  - [ ] Eliminación de Rutina
  - [ ] Activación de Rutina
