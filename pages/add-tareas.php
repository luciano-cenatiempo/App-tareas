<?php

require 'conexion.php';

$titulo=$_POST['titu'];
$detalle=$_POST['deta'];

$consultaSQL="INSERT INTO tarea(titulo,detalle)VALUES ('$titulo','$detalle')";
$resultados=mysqli_query($conexion,$consultaSQL);//DEVUELVE VERDADERO SI ESTA OK

if($resultados){
    echo "La tarea se agregó con exito";
    mysqli_close($conexion);
}else{
    die("Fallo la operacion");
}