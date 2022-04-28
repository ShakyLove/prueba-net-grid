# Activación y configuración del proyecto
1. Carpeta de ejercicisos de logica ejecutar el comando "node ."; 
2. en la carpeta del Angular front ejecutar el comando "npm install", posteriormente "ng serve" 
3. En la carpta del back ejecutar el comando "composer install", crear la base de datos "prueba" en mysql y ejecurtar las migraciones "php artisan migrate"
agregar minimo 2 registros en la tabla "identification_type". Por ultimo ejecutar el comando "php artisan serve";
4. Para crear el primer usuario ejecutar en POSTMAN el siguiente endpoint 
"http://127.0.0.1:8000/api/user/" metodo POST con la siguiente data en la seccion (body-raw) en fotmato JSON 
{
    "name": "Nombre",
    "last_name": "Apellido",
    "type_identification_id": 2,
    "identification": "836490273",
    "birth_date": "2012-04-23T18:25:43.511Z",
    "username": "Admi",
    "password": "123"
}