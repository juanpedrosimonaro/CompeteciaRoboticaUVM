
![Logo UVM](public/LOGOUVM.png)

# Competencia Robótica UVM

En este proyecto se hizo uso de variables de sesión para poder almacenar temporal en servidor gracias al paquete express-session y así poder realizar los siguientes endpoints:

### 1. /modalidades
|Sub-Ruta|Método|Descripción|
|---|---|---|
|/ingresar-modalidad|GET|Esta ruta obtiene página formateada en ejs|
|/ingresar-modalidad|POST|Recibe el parametro _nombre_ para almacenar la modalidad <br> **Retorna** en el campo _modalidad_ el objeto modalidad almacenado |

### 2. /categorias
|Sub-Ruta|Método|Descripción|
|---|---|---|
|/ingresar-categoria|GET|Esta ruta obtiene página formateada en ejs|
|/ingresar-categoria|POST|Recibe el parametro _nombre_ y _modalidadId_ para almacenar la categoria <br> **Retorna** en el campo _categoria_ todas las categorias hasta ahora almacenadas|
|/editar-categoria/:id|PUT|Además de recibir :id también recibe el parametro _nombre_ y _modalidadId_ para editar la categoria almacenada <br> **Retorna** en el campo _categoria_ todo el objeto editado|
|/eliminar-categoria|DELETE| Recibe el parametro _categoriaId_ para eliminar la categoria <br> **Retorna** en el campo _categoria_ todo el objeto eliminado |

### 3. /equipos

|Sub-Ruta|Método|Descripción|
|---|---|---|
|/ingresar-equipo|GET|Esta ruta obtiene página formateada en ejs|
|/ingresar-equipo|POST|Recibe el parametro _nombre_, array de _integrantes_ y array de _catIns_ para almacenar el equipo <br> **Retorna** en el campo _equipo_ todas las equipos hasta ahora almacenadas|
|/editar-equipo/:id|PUT|Además de recibir :id también recibe el parametro _integrantes_ y _catIns_ para editar el equipo almacenado <br> **Retorna** en el campo _equipo_ todo el objeto editado|
|/eliminar-equipo|DELETE|Recibe el parametro _equipoId_ para eliminar el equipo <br> **Retorna** en el campo _equipo_ todo el objeto eliminado |
|/equipos|GET|No recibe parametros <br> **Retorna** un array con todos los equipos almacenados |
|/equiposPorCategoria|GET|No recibe parametros <br> **Retorna** un array con todos los equipos almacenados y organizados mediante categorias |
|/eliminatCategoriaDeEquipo|DELETE| Recibe _eqId_ y _catId_ para eliminar la inscripción <br> **Retorna** el campo catEliminado con el id de la categoria inscrita eliminada |

### 4. /patrocinadores

|Sub-Ruta|Método|Descripción|
|---|---|---|
|/ingresar-patrocinador|GET|Esta ruta obtiene página formateada en ejs|
|/ingresar-patrocinador|POST|Recibe el parametro _nombre_ para almacenar el patrocinador <br> **Retorna** en el campo _patrocinador_ el objeto patrocinador creado|
|/patrocinadores/|GET|No Recibe parametros <br> **Retorna** en el campo _patrocinadores_ un array con todos los patrocinadores almacenados|



## Instalación

Para esta instalación se requiere tener instalado **Git** y **NodeJS**

Para poder instalar esta aplicación sólo se requiere ubicarse en el directorio deseado y ejecutar 

```bash
git clone https://github.com/juanpedrosimonaro/CompeteciaRoboticaUVM
```

Luego realizar ubicarse dentro del diretorio e instlar la librerias mediante el siguiente comando

```bash
npm install
```
Para ponder en marcha la aplicación se usar <code>nodemon</code> o <code>npm start</code>

Para hacer las pruebas se usó la librería de pruebas **Jest** y **Supertest**. Para correr las pruebas solamente hay que correr el siguiente comando en el terminal

```bash
npm run test
```
