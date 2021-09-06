<?php

$id= $_POST['codigo'];

require 'conexion.php';

$consultaSQL="select * from tarea where id=$id";
$resultados=mysqli_query($conexion,$consultaSQL);

$fila= mysqli_fetch_array($resultados,MYSQLI_ASSOC);

$datosJson=json_encode($fila);

echo $datosJson;
mysqli_close($conexion);
