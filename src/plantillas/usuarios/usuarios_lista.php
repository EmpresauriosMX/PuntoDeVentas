<!DOCTYPE html>
<html dir="ltr" lang="en">

    <head>
        <?php
            include '../../../componentes/head.php';
        ?>
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>


        <!-- DIV PRINCIPAL DE BODY -->
        <!-- ============================================================== -->
        <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

            <!-- ============================================================== -->
            <!-- HEADER -->
            <?php
                include '../../../componentes/header.php';
            ?>
            <!-- FIN HEADER -->
            <!-- ============================================================== -->


            <!-- ============================================================== -->
            <!-- BARRA IZQUIERDA  -->
            <?php
                include '../../../componentes/barra_izquierda.php';
            ?>
            <!-- FON BARRA IZQUIERDA  -->
            <!-- ============================================================== -->
            

            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
            <!-- CONTENEDOR -->
            <div class="page-wrapper">
                <div class="container-fluid">
                <!-- AQUI EMPEZAMOS A AGREGAR DISEÑO DEL CENTRO -->
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <!--Tabla de usuarios-->
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Tabla de Usuarios</h4>
                                        <h6 class="card-subtitle">Resultado de Usuarios...</h6>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Clave usuario</th>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Telefono</th>
                                                </tr>
                                            </thead>
                                            <tbody id="contenido_tabla">
                                                <!--inyeccion de los datos -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- Fin Tabla de Usuarios-->
                            <!-- Input de Busqueda de Usuarios -->
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Busqueda de Usuarios</h4>
                                    <h6 class="card-subtitle">Ingresa Codigo de Usuario</h6>
                                    <form class="mt-4">
                                        <div class="form-group">
                                            <label>Clave Usuario</label>
                                            <input type="text"  class="form-control">
                                            <label>Nombres</label>
                                            <input type="text" disabled="true" class="form-control">
                                            <label>Apellidos</label>
                                            <input type="text" disabled="true" class="form-control">
                                            <label>Telefono</label>
                                            <input type="text" disabled="true" class="form-control">
                                            <label>Correo</label>
                                            <input type="text" disabled="true" class="form-control">
                                        </div>
                                        <div class="text-right">
                                            <button type="submit" class="btn btn-info">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- Fin Input de Busqueda de Clientes -->
                        </div>
                    </div>
                </div>
            </div>
            <!--FIN CONTENEDOR -->
            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        </div>

        <!-- TODOS LOS ENLACES DE SCRIPTS -->
        <?php
            include '../../../componentes/scripts.php';
        ?>
            <script src="../../../inc/funciones/clientes/app.js"></script>
        <!-- FIN DE SCRIPTS -->
    </body>

</html>