# TBTB-Prueba-Tecnica
ContosoPizza es una API Web creado con ASP.NET 8.0 de productos de comida rápida asemejando una pizzería, idea del nombre del proyecto tomada de Microsoft Learn.
API Usuarios es una página que haciendo uso de Bootstrap y JQuery permite visualizar y filtrar los datos presentes en una API de datos de usuarios de prueba.

# Parte I
En la carpeta scripts hay dos scripts de MySQL para crear la base de datos y para añadir, actualizar, seleccionar y eliminar registros de las tablas creadas.

Requisitos:
  - Es necesario tener instalado MySQL, se sugiere tener instalado MySQL Workbench 8.0.

# Parte II
En la carpeta ContosoPizza se encuentra el proyecto Web API creado con ASP.NET 8.0 Framework.

A continuación se presentan los requisitos y pasos para su correcta ejecución.

Requisitos:
  - Es necesario tener instalado .NET 8.0.
  - Es sugerible utilizar Visual Studio para las pruebas con Swagger.

Pasos:
  1. Al abrir Visual Studio seleccionar la opción Abrir un proyecto o una solución.

     ![image](https://github.com/user-attachments/assets/69603e31-8b89-47a6-bbcd-e192a59bba76)
  3. Navegar hasta la carpeta ContosoPizza y seleccionar el archivo ContosoPizza.sln.

     ![image](https://github.com/user-attachments/assets/f9e6012b-1aa7-4652-9449-79635948c1cd)
  5. Dar click en confiar en el proyecto web en caso de solicitarlo.
  6. Dar doble click en el nombre del proyecto en la ventana derecha.
  7. Compilar y ejecutar el proyecto utilizando IIS Express.

     ![image](https://github.com/user-attachments/assets/4f53ba68-7a37-4dd6-8b62-0ca63f91aeaa)
  
  9. Una ventana Swagger se debe abrir en el navegador.

     ![image](https://github.com/user-attachments/assets/ed99c9ed-b109-402e-8e4c-9c252eda7c4f)
  11. Una vez la base de datos haya sido creada con exito en la parte anterior se podrán visualizar los siguientes datos en GET products.

      ![image](https://github.com/user-attachments/assets/12211445-e981-42df-9acc-407894ed3eb6)

Consideraciones:
   - Se comprende la importancia de manejar excepciones en los servicios web de forma correcta para que el usuario tenga conocimiento claro cuando sucede algún error en el sistema.
     Razón por la cual se crearon dos excepciones presentes en la carpeta Exceptions.

# Parte III
En la carpeta Registered Users se encuentra presente un archivo index.html que recupera datos de una API de usuarios de prueba y los despliega.
La página se visualiza de la siguiente manera.

![image](https://github.com/user-attachments/assets/e3b5254e-1e91-4c7c-afb8-5e915ab81683)
![image](https://github.com/user-attachments/assets/51604ab9-c7fb-40fd-a3af-12b839acebe2)







