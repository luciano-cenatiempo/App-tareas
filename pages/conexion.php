<?php

$db_host="localhost";
$db_nombre="id17555056_task_db";
$db_usuario="id17555056_rootljc";
$db_clave="mQLGi5Y^wGs4F";

$conexion=mysqli_connect($db_host, $db_usuario, $db_clave);

if(mysqli_connect_errno()){

    echo "FALLO LA CONEXION CON EL SERVIDOR";
    exit();
}

mysqli_select_db($conexion,$db_nombre) or die ("FALLO LA CONEXION CON LA BASE DE DATOS");
