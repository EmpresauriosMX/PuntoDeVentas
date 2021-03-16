const listado_marcas = document.querySelector("#contenido_tabla");
const modal = document.querySelector("#form-modal-edit");
let id_necesario = 0;

document.addEventListener("DOMContentLoaded", () => {
  mostrarServicios();
  listado_marcas.addEventListener("click", eliminar_registro);
  listado_marcas.addEventListener("click", obtener_datos_unitarios);
  modal.addEventListener("click", editar_registro);
});

async function llamado(datos) {
  try {
    const res = await fetch(
      "../../../inc/peticiones/inventario/funciones.php",
      {
        method: "POST",
        body: datos,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

 function mostrarServicios() {
  const datos = new FormData();
  datos.append("accion", "mostrarm");

  llamado(datos).then((res) => {
    res.forEach((datos) => {
      console.log(datos);
      const { id, id_categoria, nombre} = datos;

      const listado_marcas = document.querySelector("#contenido_tabla");



      listado_marcas.innerHTML +=`
          <tr id="ver_marcas_${id}">
            <th scope="row">${id}</th>
            <td>${id_categoria}</td>
            <td>${nombre}</td>
            <td>
                <button type="button" class="btn btn-primary editar" data-toggle="modal"
                data-target="#edit-modal"><i data-cliente="${id}" class="icon-pencil editar"></i></button>
            </td>
            <td>
              <button type="button" class="btn btn-primary"><i data-cliente="${id}" class="icon-trash eliminar"></i></button>
            </td>
          </tr>
      `;
    });
  });
}

function eliminar_registro(e) {
  let idEliminar = null;
  if (e.target.classList.contains("eliminar")) {
    idEliminar = Number(e.target.dataset.cliente);
    const confirmar = confirm("¿Deseas eliminar este cliente?");
    if (confirmar) {
      //  console.log(idEliminar);
      const datos = new FormData();
      datos.append("id", idEliminar);
      datos.append("accion", "eliminarm");
      llamado(datos).then((res) =>
        e.target.parentElement.parentElement.remove()
      );
    }
  }
}


function obtener_datos_unitarios(e) {
  let idEliminar = null;
  if (e.target.classList.contains("editar")) {
    console.log("Entro a editar");
    idEliminar = Number(e.target.dataset.cliente);
    id_necesario = idEliminar;
    console.log(id_necesario);
    const datos = new FormData();
    datos.append("id", id_necesario);
    datos.append("accion", "buscarm");
    llamado(datos).then((res) => {
      console.log(res);
      const edit_marca = (document.querySelector("#edit_marca").value =
        res.nombre);
      const edit_estado = (document.querySelector("#edit_categoria").value =
        res.id_categoria);
    });
  }
}

 function editar_registro(e) {
  e.preventDefault();
  const edit_marca = document.querySelector("#edit_marca").value;
  const edit_categoria = document.querySelector("#edit_categoria").value;

  const datos = new FormData();
  datos.append("id", id_necesario);
  datos.append("nombre", edit_marca);
  datos.append("categoria", edit_categoria);
  datos.append("accion", "actualizarm");

  /*const peticion = await llamado(datos);
  console.log(peticion);
  alert("los datos se han cambiado correctamente");*/

  llamado(datos).then((res) => {
    console.log(res);
    const registro_contenido = document.querySelector(
      `#ver_marcas_${id_necesario}`
    );

    const { id, nombre_categoria, estado, detalles } = res;
    registro_contenido.innerHTML = `
    <th scope="row">${id}</th>
        <td>${id_categoria}</td>
        <td>${nombre}</td>
        <td>
            <button type="button" class="btn btn-primary editar" data-toggle="modal"
            data-target="#edit-modal"><i data-cliente="${id}" class="icon-pencil editar"></i></button>
        </td>
        <td>
            <button type="button" class="btn btn-primary"><i data-cliente="${id}" class="icon-trash eliminar"></i></button>
        </td>
    `;
    // console.log(registro_contenido);
  });
}
