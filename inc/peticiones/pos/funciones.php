<?php
$accion = $_POST['accion'];
require 'consultas.php';
switch ($accion) {
    case "buscar_producto":
        $resultado = buscar_producto();
        break;
    case "venta_actual":
        $resultado = venta_actual();
        break;
    case "eliminar_venta":
        $resultado = eliminar_venta();
        break;
    case "registrar_venta":
        $resultado = registrar_venta();
        break;
    case "buscar_cliente":
        $resultado = buscar_cliente();
        break;
}
echo json_encode(($resultado));// envio el retorno del array a donde se me pide