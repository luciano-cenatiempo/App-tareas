<?php


require 'conexion.php';


$consultaSQL="select * from tarea";
$resultados=mysqli_query($conexion,$consultaSQL);



while($fila= mysqli_fetch_array($resultados,MYSQLI_ASSOC)){

    $datos[]=$fila;
}

$datosJson=json_encode($datos);

echo $datosJson;
mysqli_close($conexion);
