  
async function mostrarServicios() {
  const datos = new FormData();
  datos.append("accion", "horariosLista");

  try {
    const URL = "../../../inc/peticiones/usuarios/funciones.php";
    const resultado = await fetch(URL, {
      method: "POST",
      body: datos,
    });
    const db = await resultado.json();

    db.forEach((servicio) => {
      //console.log(servicio);
      const { id_jornada, nombre_horario, h_entrada, h_salida} = servicio;

      const listado_clientes = document.querySelector("#contenido_tabla");

     
      listado_clientes.innerHTML += `  
      <tr>
          <td scope="row">${id_jornada}</td>
          <td scope="row">${nombre_horario}</td>
          <td>${h_entrada} </td> 
          <td>${h_salida} </td>  
          <td>
              <button type="button" class="btn editar" data-usuario="${id_jornada}" data-toggle="modal" data-target="#edit-modal${id_jornada}"> <i  class="fas fa-edit"></i></button>
              <button type="button" class="btn eliminar" data-usuario="${id_jornada}"><i class="fas fa-trash"></i></button>
          </td>      
      </tr>
      <!-- Modal editar -->
      <div id="edit-modal${id_jornada}" class="modal fade" tabindex="${id_jornada}" role="dialog"
          aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <h4 class="mt-3 mx-auto"> Editar el horario <strong>${nombre_horario}</strong> </h4>
                  
                  <div class="modal-body">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                      <form class="pl-3 pr-3" action="#" id="form-modal-edit" name="for-modal-edit">
                        
                        <p>ID: ${id_jornada}</p>
                        <label>Titulo del horario</label>
                        <input id="edit_nombre${id_jornada}" type="text" placeholder="ejemplo: matutino" minlength="2" class="form-control" value="${nombre_horario}" required="">
                        <label>Hora de entrada (formato 24 horas)</label>
                        <input id="edit_entrada${id_jornada}" type="time" value="${h_entrada}" placeholder="10:00" class="form-control" required="">
                        <label>Hora de salida (formato 24 horas)</label>
                        <input id="edit_salida${id_jornada}" type="time" value="${h_salida}"  placeholder="13:00" class="form-control" required="">
                        <div class="text-right mt-3">
                            <button type="submit" onclick="editar_horario(${id_jornada})" class="btn btn-success" data-dismiss="modal" aria-hidden="true">Guardar</button>
                            <button type="reset" class="btn btn-dark" data-dismiss="modal" aria-hidden="true"> Cancelar</button>
                        </div>

                      </form>

                  </div>
              </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
      </div>
      <!-- Fin modal editar -->

     
                        
        `;
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
    const confirmar = confirm('Deseas eliminar el horario: '+idEliminar);
    if(confirmar){
      try {
        console.log(idEliminar);
        const datos = new FormData();
        datos.append("id", idEliminar);
        datos.append("accion", "eliminar_horario");
  
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
              <strong>El horario ha sido eliminado exitosamente </strong>
          </div>
          `;
          e.target.parentElement.parentElement.remove();
        
      } catch (error) {
        console.log(error);
      }
    }
  }
}



async function editar_horario(id_necesario){
  var id_necesario;
  const edit_nombre = document.getElementById("edit_nombre"+id_necesario).value; 
  const edit_entrada = document.querySelector("#edit_entrada"+id_necesario).value;
  const edit_salida = document.querySelector("#edit_salida"+id_necesario).value;

  try {
    const datos = new FormData();
    datos.append("id", id_necesario);
    datos.append("nombre", edit_nombre);
    datos.append("entrada", edit_entrada);
    datos.append("salida", edit_salida);
    datos.append("accion", "actualizar_horario");

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
          <strong>El horario ha sido editado exitosamente </strong>
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