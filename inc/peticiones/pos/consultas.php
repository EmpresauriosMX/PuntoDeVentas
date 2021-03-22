<?php
function buscar_producto(): array
{
    try {
        require '../../../conexion.php';

        $codigo = $_POST['codigo'];

        $sql = "select * from productos_inventario where codigo=$codigo;";
        $consulta = mysqli_query($conexion, $sql);

        $estado = false;
        while ($row = mysqli_fetch_assoc($consulta)) { //usar cuando se espera varios resultadosS
            $id_producto = $row['id_producto'];
            $codigo = $row['codigo'];
            $foto = $row['foto'];
            $descripcion = $row['descripcion'];
            $precio_venta = $row['precio_venta'];
            $nombre = $row['nombre_producto'];
            $estado = true;
        }

        $respuesta = array(
            'id_producto' => $id_producto,
            'codigo' => $codigo,
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'precio_venta' => $precio_venta,
            'foto' => $foto,
            'cantidad' => 1
        );

        return $respuesta;


        //  return $arreglo;

    } catch (\Throwable $th) {
        if (var_dump($th)) {
            $row = "error, no se encontro";
            return $row;
        }
    }
    mysqli_close($conexion);
}
function venta_actual(): array
{ {
        try {
            //   $id_venta = $_POST['id_venta'];


            require '../../../conexion.php';
            //////////////////////
            $sql1 = "SELECT * FROM ventas ORDER BY id_venta DESC LIMIT 1;";
            $consulta1 = mysqli_query($conexion, $sql1);

            while ($row1 = mysqli_fetch_assoc($consulta1)) { //usar cuando se espera varios resultadosS
                $id_venta = (int) $row1['id_venta'];
            }
            ////////////////////////
            $sql = "SELECT detalle_venta.cantidad,detalle_venta.id_detalle_venta,productos_inventario.nombre_producto,productos_inventario.codigo,productos_inventario.foto,productos_inventario.descripcion,detalle_venta.id_venta,productos_inventario.precio_venta,detalle_venta.importe from detalle_venta, productos_inventario, ventas WHERE detalle_venta.id_venta = ventas.id_venta AND detalle_venta.id_venta = $id_venta and productos_inventario.id_producto = detalle_venta.id_producto;";
            $consulta = mysqli_query($conexion, $sql);
            $sql = mysqli_num_rows($consulta);
            $datos = [];
            $i = 0;

            if (!($sql == 0)) {
                while ($row = mysqli_fetch_assoc($consulta)) { //usar cuando se espera varios resultadosS
                    $datos[$i]['cantidad'] = $row['cantidad'];
                    $datos[$i]['nombre'] = $row['nombre_producto'];
                    $datos[$i]['id_producto'] = $row['id_producto'];
                    $datos[$i]['id_detalle_venta'] = $row['id_detalle_venta'];
                    $datos[$i]['codigo'] = $row['codigo'];
                    $datos[$i]['foto'] = $row['foto'];
                    $datos[$i]['descripcion'] = $row['descripcion'];
                    $datos[$i]['id_venta'] = $id_venta;
                    $datos[$i]['precio_venta'] = $row['precio_venta'];
                    $datos[$i]['importe'] = $row['importe'];
                    $i++;
                }
                return $datos;
            } else {
                for ($i = 0; $i < 1; $i = +1) {
                    $datos[$i]['respuesta'] = 'no existe productos en este id';
                    $datos[$i]['id_venta'] = $id_venta;
                }

                return $datos;
            }
        } catch (\Throwable $th) {
            var_dump($th);
        }
        mysqli_close($conexion);
    }
}

function aumentar(): array
{ {
        try {

            $id = $_POST['id'];
            require '../../../conexion.php';
            $sql = "SELECT productos_inventario.precio_venta, detalle_venta.cantidad from productos_inventario, detalle_venta WHERE detalle_venta.id_detalle_venta = $id AND productos_inventario.id_producto = detalle_venta.id_producto ;";
            $consulta = mysqli_query($conexion, $sql);

            while ($row = mysqli_fetch_assoc($consulta)) { //usar cuando se espera varios resultadosS
                $cantidad_var = (int) $row['cantidad'];
                $precio_venta = (int) $row['precio_venta'];
            }


            $id = $_POST['id'];
            $cantidad = (int)$cantidad_var;
            $cantidad = $cantidad + 1;
            $importe = $precio_venta * $cantidad;
            $sql1 = "update detalle_venta set cantidad = $cantidad, importe = $importe where detalle_venta.id_detalle_venta = $id";
            $consulta1 = mysqli_query($conexion, $sql1);
            $datos = [];

            $datos = array(
                'estado' => "correcto",
                'valor' => "si cambio",
                'nueva_cantidad' => $cantidad,
                'nuevo_importe' => $importe,
                'precio_venta' => $precio_venta
            );
            return $datos;
        } catch (\Throwable $th) {
            var_dump($th);
        }
        mysqli_close($conexion);
    }
}

function disminuir(): array
{ {
        try {

            $id = $_POST['id'];
            require '../../../conexion.php';
            $sql = "SELECT productos_inventario.precio_venta, detalle_venta.cantidad from productos_inventario, detalle_venta WHERE detalle_venta.id_detalle_venta = $id AND productos_inventario.id_producto = detalle_venta.id_producto ;";
            $consulta = mysqli_query($conexion, $sql);

            while ($row = mysqli_fetch_assoc($consulta)) { //usar cuando se espera varios resultadosS
                $cantidad_var = (int) $row['cantidad'];
                $precio_venta = (int) $row['precio_venta'];
            }


            $id = $_POST['id'];
            $cantidad = (int)$cantidad_var;
            $cantidad = $cantidad - 1;
            $importe = $precio_venta * $cantidad;
            $sql1 = "update detalle_venta set cantidad = $cantidad, importe = $importe where detalle_venta.id_detalle_venta = $id";
            $consulta1 = mysqli_query($conexion, $sql1);
            $datos = [];

            $datos = array(
                'estado' => "correcto",
                'valor' => "si cambio",
                'nueva_cantidad' => $cantidad,
                'nuevo_importe' => $importe,
                'precio_venta' => $precio_venta
            );
            return $datos;
        } catch (\Throwable $th) {
            var_dump($th);
        }
        mysqli_close($conexion);
    }
}


function cerrar_venta(): array
{ { //pendiente de eliminar si funciona correctamente registrar_venta();
        try {
            $total_venta = $_POST['total_venta'];
            require '../../../conexion.php';
            $sql = "SELECT * FROM ventas ORDER BY id_venta DESC LIMIT 1;";
            $consulta = mysqli_query($conexion, $sql);

            while ($row = mysqli_fetch_assoc($consulta)) { //usar cuando se espera varios resultadosS
                $id_venta = (int) $row['id_venta'];
            }
            $sql1 = "update ventas set importe = $total_venta where ventas.id_venta = $id_venta";
            $consulta1 = mysqli_query($conexion, $sql1);

            $sql = " INSERT INTO ventas (id_venta, id_cliente, id_empleado, importe) VALUES (NULL, '1', '1', '1');";
            $consulta = mysqli_query($conexion, $sql);
            $datos = array(
                'id' => mysqli_insert_id($conexion),
                'estado' => "correcto",
                'mensaje' => "se ha actualizado el total de la venta"
            );
            return $datos;
        } catch (\Throwable $th) {
            var_dump($th);
        }
        mysqli_close($conexion);
    }
}

function eliminar_venta(): array
{
    try {
        $id = $_POST['id'];
        require '../../../conexion.php';
        //eliminar los productos en la venta 
        $sql = "DELETE FROM `detalle_venta` WHERE `detalle_venta`.`id_venta` = $id";
        $consulta = mysqli_query($conexion, $sql);

        //eliminar la venta
        $sql = "DELETE FROM `ventas` WHERE `ventas`.`id_venta` = $id";
        $consulta = mysqli_query($conexion, $sql);

        //crear nueva venta
        $sql = " INSERT INTO ventas (id_venta, id_cliente, id_empleado, importe) VALUES (NULL, '1', '1', '1');";
        $consulta = mysqli_query($conexion, $sql);

        $resultado = array(
            'respuesta' => 'desde eliminar venta',
            'id_recibido' => $id,
            'id_nueva_venta' => mysqli_insert_id($conexion)
        );
        return $resultado;
    } catch (\Throwable $th) {
        return $th;
    }
}


function otro()
{
    $id = 1;
    $codigo = " mundo";
    comprobar_registro($id, $codigo);
}

function comprobar_registro($valor, $valor2)
{
    echo "<br>";
    echo $valor;
    echo "<br>";
    echo $valor2;

    echo "hola desde comprobar";
}



function registrar_venta(): array
{
    try {
        require '../../../conexion.php';

        $id_venta = $_POST['id_venta'];
        $total = $_POST['total_venta'];



        $stmt = $conexion->prepare("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, importe) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiii", $venta, $producto, $cantidad, $importe);
        $contador = 0;

        if (isset($_POST['someData'])) {
            $array = json_decode($_POST['someData']);
            foreach ($array as $key => $value) {
                $venta = $id_venta;
                $producto = (int) $value->id;
                $cantidad = $value->cantidad;
                $importe = $value->importe;
                $contador++;
                $stmt->execute();
            }
        }
        $sql = "update ventas set importe = $total where ventas.id_venta = $id_venta";
        $consulta = mysqli_query($conexion, $sql);
        
        $sql = " INSERT INTO ventas (id_venta, id_cliente, id_empleado, importe) VALUES (NULL, '1', '1', '1');";
        $consulta = mysqli_query($conexion, $sql);

        $respuesta = array(
            'respuesta' => "correcto",
            'id' => mysqli_insert_id($conexion),
            'contador' => $contador
        );
        return $respuesta;
    } catch (\Throwable $th) {
        return $th;
    }
}
