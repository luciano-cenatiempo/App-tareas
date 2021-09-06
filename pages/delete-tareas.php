<?php

require 'conexion.php';
$codigo=$_POST['codigo'];

$consultaSQL="DELETE FROM tarea WHERE id=$codigo";
$resultados=mysqli_query($conexion,$consultaSQL);

if($resultados){
    echo "La tarea se elimino con exito";
    mysqli_close($conexion);
}else{
    
    die("Fallo la operacion");
}
