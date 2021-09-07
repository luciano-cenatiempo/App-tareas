<?php

$db_host="localhost";
$db_nombre="task_db";
$db_usuario="rootLjc";
$db_clave="ljc010203";

$conexion=mysqli_connect($db_host, $db_usuario, $db_clave);

if(mysqli_connect_errno()){

    echo "FALLO LA CONEXION CON EL SERVIDOR";
    exit();
}

mysqli_select_db($conexion,$db_nombre) or die ("FALLO LA CONEXION CON LA BASE DE DATOS");
