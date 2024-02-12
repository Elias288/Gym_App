# GYM App v0.9.4

## Caracteristicas

- [x] Crear usuario
- [x] Loguear usuario
- [x] Crear rutina (dias, ejercicios)
- [x] Visualizar lista de rutinas
- [x] Visualizar información de rutina
- [ ] Editar rutina
- [ ] Eliminar rutina
- [x] Seleccionar rutina

## Descripción

Aplicación movil en React Native que permita llevar un registro y control de rutinas de ejercicios, pesos que se estén levantando, estado del usuario (peso, altura, etc.). La rutina seleccionada y la información de usuario debe almacenarse localmente, al iniciar la aplicación se debe consultar al backend y actualizar la información.
Esto se llevará a cabo utilizando "Rutinas", estas rutinas contendrán:

- Nombre que lo identifique
- Días de una semana

en los días de la semana una lista de ejercicios, cada ejercicio contendrá:

- Nombre del ejercicio
- Cantidad de repeticions (cantidad de veces que se realiza el ejercicio)
- Cantidad de series (veces que se hacen las repeticiones)

Un usuario puede tener más de una rutina cargada pero solamente una activa, esto implica que al iniciar la aplicación se muestre el contenido de la rutina activa. Esto implica que un usuario debe poder crear una rutina, modificarla, eliminarla y activarla. Se deben almacenar tanto en local como en remoto utilizando una api.

![Diagrama BD](https://github.com/Elias288/Gym_App/blob/master/assets/gymDiagram.drawio.png)

![Proyect flow](https://github.com/Elias288/Gym_App/blob/master/assets/gymFlow.drawio.png)

## Referencias

[Idea de login](https://i.pinimg.com/originals/bf/d5/70/bfd57007adc74d24e9a20212cc074295.png)
