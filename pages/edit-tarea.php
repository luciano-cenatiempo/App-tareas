<?php
require 'conexion.php';

$id=$_POST['codigo'];
$titulo=$_POST['titulo'];
$detalle=$_POST['detalle'];

$consultaSQL="UPDATE tarea SET detalle='$detalle', titulo='$titulo' WHERE id=$id";
$resultados=mysqli_query($conexion,$consultaSQL);//DEVUELVE VERDADERO SI ESTA OK

if($resultados){
    echo "La tarea se modificó con exito";
    mysqli_close($conexion);//Cierra la conexion (hay que hacerlo)
}else{
    
    die("Fallo la operacion");//Mata la conexion y libera todos los recursos
}
