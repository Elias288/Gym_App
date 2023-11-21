# Montando Base de datos en contenedor

## Construcción de contenedor

```sh
podman play kube database/Pod.yaml
```

## Construcción de contenedor Manual

Comando para construir contenedor manualmente:

```sh
podman run -d  --name gymapp-pod-mongoDB -p 3306:27017 -v gymapp-mongo-volume:/data/db -e MONGO_INITDB_ROOT_USERNAME=<username> -e MONGO_INITDB_ROOT_PASSWORD=<password> mongo
```

`podman run -d`: ejecuta en segundo plano

`--name gymapp-mongo`: le setea el nombre del contenedor

`-p 27017:27017`: mapea el puerto 27017 al (primero) puerto host 27017

`-v gymapp-mongo-volume:/data/db`: setea el volumen gymapp-mongo-volume para que persista al contenedor

`-e MONGO_INITDB_ROOT_USERNAME=<username>`: setea la variable ROOT_USERNAME

`-e MONGO_INITDB_ROOT_PASSWORD=<password>`: setea la variable ROOT_PASSWORD

`mongo`: nombre de la imagen a usar

---

## Info de servidor MongoDb

```sh
mongodb://<username>:<password>@localhost:27017/?authMechanism=DEFAULT
```

Nombre de la base de datos `gymAppMongo`

## Comandos utiles

Ver log:

```sh
podman log -f <container_name>
```

Ejecutar bash de contenedor:

```sh
podman exec -it <container_name> sh
```

Abre una instancia de mongo en un contenedor interactivo.

```sh
podman exec -it <container_name> mongosh
```

## Docuemntación

[Crud Mambu](https://www.mongodb.com/docs/manual/crud/)
