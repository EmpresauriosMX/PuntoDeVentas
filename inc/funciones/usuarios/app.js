  
async function mostrarServicios() {
  const datos = new FormData();
  datos.append("accion", "mostrar");

  try {
    const URL = "../../../inc/peticiones/usuarios/funciones.php";
    const resultado = await fetch(URL, {
      method: "POST",
      body: datos,
    });
    const db = await resultado.json();

    db.forEach((servicio) => {
      //console.log(servicio);
      const { id_usuario, nombres, apellidos, telefono, correo, usuario, contrasenia, estado, fotografia } = servicio;

      const listado_clientes = document.querySelector("#contenido_tabla");

      if(estado == 1 ){
        estado_imprimir = `<td class="bg-success"> Activo <i class="fas fa-check-circle "></i></td>`;
      }
      
      listado_clientes.innerHTML += `  
      <tr>
          <td scope="row">${id_usuario}</td>
          <td> <img src="../../assets/images/users/${fotografia}" alt="user" class="rounded-circle"
            width="40"> </td>
          <td>${nombres} ${apellidos}</td>
          <td>${telefono}</td>
          <td>${correo}</td>
          <td>${usuario}</td>
          <td class="" id="estado${id_usuario}"></td>
          <td>
              <button type="button" class="btn editar" data-usuario="${id_usuario}" data-toggle="modal" data-target="#edit-modal${id_usuario}"> <i  class="fas fa-edit"></i></button>
              <button type="button" class="btn eliminar" data-usuario="${id_usuario}"><i class="fas fa-trash"></i></button>
          </td>
      </tr>
                        <!-- Modal editar -->
                          <div id="edit-modal${id_usuario}" class="modal fade" tabindex="${id_usuario}" role="dialog"
                              aria-hidden="true">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <h4 class="mt-3 mx-auto"> Editar usuario <strong>${nombres} ${apellidos}</strong> </h4>
                                      
                                      <div class="modal-body">
                                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                                          <form class="pl-3 pr-3" action="#" id="form-modal-edit" name="for-modal-edit">
                                            
                                            <p>ID: ${id_usuario}</p>
                                            <label>Nombres</label>
                                            <input id="edit_nombres${id_usuario}" type="text" value="${nombres}" placeholder="Ingresa nombre(s) del usuario" minlength="2" class="form-control" required="">
                                            <label>apellidos</label>
                                            <input id="edit_apellidos${id_usuario}" type="text" value="${apellidos}"  placeholder="Ingresa apellidos del usuario" minlength="2" class="form-control" required="">
                                            <label>Telefono</label>
                                            <input id="edit_telefono${id_usuario}" type="text" value="${telefono}"  placeholder="Ingresa numero de telefono de usuario" minlength="10"  maxlength="12"  class="form-control" required="">
                                            <label>Correo</label>
                                            <input id="edit_correo${id_usuario}" type="email" value="${correo}"  placeholder="Ingresa correo del cliente" minlength="5" class="form-control" required="">
                                            <label>Usuario</label>
                                            <input id="edit_usuario${id_usuario}" type="text" value="${usuario}"  placeholder="Usuario" minlength="5" class="form-control" required="">
                                            <label>Contrase??a</label>
                                            <input id="edit_contrasenia${id_usuario}" type="password" value="${contrasenia}"  placeholder="Contrase??a" minlength="5" class="form-control" required="">
                                            <label>Estado</label>
                                            
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text" for="inputGroupSelect01">Estados</label>
                                                </div>
                                                <select class="custom-select" id="edit_estado${id_usuario}">
                                                    <option value="0">Inactivo</option>
                                                    <option value="1">Activo</option>
                                                    <option value="2">De baja</option>
                                                </select>
                                            </div>
                                
                                            <div class="text-right mt-3">
                                                <button type="submit" onclick="editar_usuario(${id_usuario})" class="btn btn-success" data-dismiss="modal" aria-hidden="true">Guardar</button>
                                                <button type="reset" class="btn btn-dark" data-dismiss="modal" aria-hidden="true"> Cancelar</button>
                                            </div>
                                          </form>
                                      </div>
                                  </div><!-- /.modal-content -->
                              </div><!-- /.modal-dialog -->
                          </div>
                          <!-- Fin modal editar -->
        `;
        let casilla_estado =  document.querySelector("#estado"+id_usuario);

        if(estado == 0 ){
          casilla_estado.setAttribute("class", "bg-warning text-white");
          casilla_estado.innerHTML = "Inactivo"
          
          //estado_imprimir = `<td class="bg-success"> Activo <i class="fas fa-check-circle "></i></td>`;
        }
        if(estado == 1 ){
          casilla_estado.setAttribute("class", "bg-success text-white");
          casilla_estado.innerHTML = "Activo"
          
          //estado_imprimir = `<td class="bg-success"> Activo <i class="fas fa-check-circle "></i></td>`;
        }
        if(estado == 2 ){
          casilla_estado.setAttribute("class", "bg-danger text-white");
          casilla_estado.innerHTML = "De baja"
          
          //estado_imprimir = `<td class="bg-success"> Activo <i class="fas fa-check-circle "></i></td>`;
        }
        
        

    });
  } catch (error) {
    console.log(error);
  }
}

const listado_usuario = document.querySelector("#contenido_tabla");
document.addEventListener("DOMContentLoaded", () => {
  mostrarServicios();
  listado_usuario.addEventListener("click", eliminar_registro);
});

async function eliminar_registro(e) {
  let idEliminar = null;
  if (e.target.classList.contains("eliminar")) {
    idEliminar = Number(e.target.dataset.usuario);
    const confirmar = confirm('??PRECAUCI??N! ESTA ACCI??N PUEDE AFECTAR LOS DEM??S MODULOS DONDE ESTE USAURIO HA SIDO INVOLUCRADO. Se recomienda solo cambiar el estado a inactivo');
    if(confirmar){
      try {
        console.log(idEliminar);
        const datos = new FormData();
        datos.append("id", idEliminar);
        datos.append("accion", "eliminar");
  
        const res = await fetch("../../../inc/peticiones/usuarios/funciones.php", {
          method: "POST",
          body: datos,
        });

        //MENSAJE DE EXITO AL ELIMINAR
        const mensajes = document.querySelector("#mensaje2");
        mensajes.innerHTML += `  
          <div class="alert alert-danger alert-dismissible bg-success text-white border-0 fade show" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">??</span>
              </button>
              <strong>El usuario ha sido eliminado exitosamente </strong>
          </div>
          `;
          e.target.parentElement.parentElement.remove();
        
      } catch (error) {
        console.log(error);
      }
    }
  }
}



async function editar_usuario(id_necesario){
  var id_necesario;
  const edit_nombres = document.getElementById("edit_nombres"+id_necesario).value; 
  const edit_apellidos = document.querySelector("#edit_apellidos"+id_necesario).value;
  const edit_telefono = document.querySelector("#edit_telefono"+id_necesario).value;
  const edit_correo = document.querySelector("#edit_correo"+id_necesario).value;
  const edit_usuario = document.querySelector("#edit_usuario"+id_necesario).value;
  const edit_contrasenia = document.querySelector("#edit_contrasenia"+id_necesario).value;
  const edit_estado = document.querySelector("#edit_estado"+id_necesario).value;

  try {
    const datos = new FormData();
    datos.append("id", id_necesario);
    datos.append("nombres", edit_nombres);
    datos.append("apellidos", edit_apellidos);
    datos.append("telefono", edit_telefono);
    datos.append("correo", edit_correo);
    datos.append("usuario", edit_usuario);
    datos.append("contrasenia", edit_contrasenia);
    datos.append("estado", edit_estado);
    datos.append("accion", "actualizar");

    const res = await fetch("../../../inc/peticiones/usuarios/funciones.php", {
      method: "POST",
      body: datos,
    });
    const data = await res.json();
    //console.log(data);
    //mesaje de exito
    const mensajes = document.querySelector("#mensaje2");
    mensajes.innerHTML += `  
      <div class="alert alert-danger alert-dismissible bg-success text-white border-0 fade show" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">??</span>
          </button>
          <strong>El usuario ha sido editado exitosamente </strong>
      </div>
      `;
    //Se vacia el contenido de la tabla
    document.getElementById("contenido_tabla").innerHTML="";
    //Llamada a la funcion para llenar la tabla 
    mostrarServicios(); 
  } catch (error) {
    console.log(error);
  }
}