<?php

$dato=$_POST['dato'];
require 'conexion.php';

$consultaSQL="select * from tarea WHERE titulo LIKE '%$dato%' OR detalle LIKE '%$dato%'";
$resultados=mysqli_query($conexion,$consultaSQL);
$filasEncontradas=mysqli_num_rows($resultados);
if ($filasEncontradas==0){
    echo "CERO RESULTADOS";
} else {

    while($fila= mysqli_fetch_array($resultados,MYSQLI_ASSOC)){

        $datos[]=$fila;
    }
    $datosJson=json_encode($datos);
    echo $datosJson;
}
mysqli_close($conexion);
 