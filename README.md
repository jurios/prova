
# Pasos per llançar el visualitzador

## Requeriments
El projecte està configurat per utilitzar contenedors docker fent ús d'un wrapper per a Laravel anomenat `sail`.
És important que tingueu el `docker engine` i no el `docker desktop` ja que `sail` no és compatible amb el desktop.

Instal·lació de `docker engine`: https://docs.docker.com/engine/install/
A més, `docker` ha de poder-se llançar per l'usuari. (https://docs.docker.com/engine/install/linux-postinstall/)

La base de dades postgres, el PHP i el servidor web s'instal·larà com contenidors docker 
pel que no és necessari cap instal·lació addicional.

Tingueu en compte que els ports que va a fer servir aquests serveis són el `80` i el `5432` 
pel que haurien d'estar disponibles.


## Configuració
Copiar el fitxer de configuració:
```
cp .env.example .env
```

I afegir en aquest fitxer (`.env`) la apikey de GoogleMaps Javascript API:

```
GOOGLE_MAPS_APIKEY=APIKEY
```

## Instal·lar les dependències de composer:
Aquest pas trigarà un poc perquè descarregarà totes les imatges necessàries (composer) i instal·larà tots els paquets:

```
      docker run --rm \
      -u "$(id -u):$(id -g)" \
      -v "$(pwd):/var/www/html" \
      -w /var/www/html \
      laravelsail/php82-composer:latest \
      composer install --ignore-platform-reqs
``` 

## Executar sail
Aquest pas trigarà un poc perquè descarregarà totes les imatges necessàries (php+apache, postgres)
```
vendor/bin/sail up -d
```
## Generar una app key
Aquest pas és necessari per fer funcionar l'aplicació Laravel:

```
vendor/bin/sail php artisan key:generate
```
## Executar la compil·lació d'assets
```
vendor/bin/sail npm install
vendor/bin/sail npm run build
```

## Llançar migracions i importar les dades del CSV
Primer hem de moure el `csv` dins de la carpeta del projecte. Per exemple, a `storage/app/`:
```
mv /lloc/on/esta/el/fitxer.csv /directori/del/projecte/storage/app/dades.csv 
```
Migrem la base de dades per a que tinga la taula necessària:

```
vendor/bin/sail php artisan migrate
```

I importem les dades. Noteu que ací especifiquem la ruta relativa a la carpeta del projecte

```
vendor/bin/sail php artisan observations:import storage/app/dades.csv
```

El procés importará les observacions i notificarà d'aquelles files del CSV que no ha pogut importar.

Ja podeu veure la web a `localhost`.

## Tancar el projecte
Simplement parem els contenidors amb:

```
vendor/bin/sail down
```
