# proyecto-de-grado

APLICACIÓN DE REGRESIÓN DEL ÁREA DE AFECTACIÓN DE INCENDIOS FORESTALES CON SOFTWARE LIBRE, CASO DE ESTUDIO DEL PARQUE MONTESINHO

Run virtualenv

```bash
source ./venv/bin/activate
```

If you don't have virtualenv installed, click [here](https://gist.github.com/Geoyi/d9fab4f609e9f75941946be45000632b) by install in ubuntu.

Install dependences

```bash
pip3 install -r requirements.txt
```

Run neural network in jupiter

```bash
jupyter-lab # Open file jupiter_red_neuronal
```

Run in bash

```bash
./red_reuronal.py
```
Note: Inside the [visor](https://github.com/MauricioAcosta/graduation-project-forest-fires-data-set/tree/master/visor) folder is the frontend of the application and its README and in the [webservice](https://github.com/MauricioAcosta/graduation-project-forest-fires-data-set/tree/master/webservice) folder is the backend of the application which uses the neural network.

## Run backend

Requirements
- python 3.x
- pip v3

Inside the [folder webservice](https://github.com/MauricioAcosta/graduation-project-forest-fires-data-set/tree/master/webservice) run the next command

Install dependences

```bash
pip3 install -r requirements.txt
```
Run server

```bash
./manage.py runserver
```
## Run Frontend

Inside the [folder visor](https://github.com/MauricioAcosta/graduation-project-forest-fires-data-set/tree/master/visor) run the next command

Requirements
- node v10.x.x
- npm v6.x.x

Install dependences

```bash
npm install
```
Run server

```bash
npm start
```
Navigate to `http://localhost:4200/`. in your browser of choice.
