const listado_categoria = document.querySelector("#contenido_tabla");
const modal = document.querySelector("#form-modal-edit");
const btn_buscar = document.querySelector("#buscar");
let id_necesario = 0;

document.addEventListener("DOMContentLoaded", () => {
  mostrarServicios();
  listado_categoria.addEventListener("click", eliminar_registro);
  listado_categoria.addEventListener("click", obtener_datos_unitarios);
  modal.addEventListener("submit", editar_registro);
  btn_buscar.addEventListener("click", busqueda_especifica);
});

function busqueda_especifica(e) {
  listado_categoria.innerHTML = "";
  e.preventDefault();
  const texto_buscar = document.querySelector("#valor_busqueda").value;

  const datos = new FormData();
  datos.append("nombre", texto_buscar);
  datos.append("accion", "filtroc");

  llamado(datos).then((res) => {
    res.forEach((datos) => {
      console.log(datos);
      const { id, nombre_categoria, marca, detalles} = datos;

      const listado_categoria = document.querySelector("#contenido_tabla");

      listado_categoria.innerHTML +=`
          <tr id="ver_categorias_${id}">
            <th scope="row">${id}</th>
            <td>${nombre_categoria}</td>
            <td>${detalles}</td>
            <td>${marca}</td>
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
  //setInterval("actualizar()",1000);
}

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
  datos.append("accion", "mostrarc");

  llamado(datos).then((res) => {
    res.forEach((datos) => {
      console.log(datos);
      const { id, nombre_categoria, marca, detalles} = datos;

      const listado_categoria = document.querySelector("#contenido_tabla");

      listado_categoria.innerHTML +=`
          <tr id="ver_categorias_${id}">
            <th scope="row">${id}</th>
            <td>${nombre_categoria}</td>
            <td>${detalles}</td>
            <td>${marca}</td>
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
    const confirmar = confirm("??Deseas eliminar este cliente?");
    if (confirmar) {
      //  console.log(idEliminar);
      const datos = new FormData();
      datos.append("id", idEliminar);
      datos.append("accion", "eliminarc");
      llamado(datos).then((res) =>
        e.target.parentElement.parentElement.remove()
      );
    }
  }
}
function actualizar(){location.reload(true);}

function obtener_datos_unitarios(e) {
  let idEliminar = null;
  if (e.target.classList.contains("editar")) {
    console.log("Entro a editar");
    idEliminar = Number(e.target.dataset.cliente);
    id_necesario = idEliminar;
    console.log(id_necesario);
    const datos = new FormData();
    datos.append("id", id_necesario);
    datos.append("accion", "buscarc");
    llamado(datos).then((res) => {
      console.log(res);
      const edit_categoria = (document.querySelector("#edit_categoria").value =
        res.nombre_categoria);
      const edit_marca = (document.querySelector("#edit_marca").value =
        res.id_marca);
      const edit_detalles = (document.querySelector("#edit_detalles").value =
        res.detalles);
    });
  }
}

 function editar_registro(e) {
  e.preventDefault();
  const edit_categoria = document.querySelector("#edit_categoria").value;
  const edit_marca = document.querySelector("#edit_marca").value;
  const edit_detalles = document.querySelector("#edit_detalles").value;

  const datos = new FormData();
  datos.append("id", id_necesario);
  datos.append("nombre", edit_categoria);
  datos.append("marca", edit_marca);
  datos.append("detalles", edit_detalles);
  datos.append("accion", "actualizarc");
 
  alert('Categoria Actualizada');
  setInterval("actualizar()",1000);

  /*const peticion = await llamado(datos);
  console.log(peticion);
  alert("los datos se han cambiado correctamente");*/

  llamado(datos).then((res) => {
    console.log(res);
    const registro_contenido = document.querySelector(
      `#ver_categorias_${id_necesario}`
    );

    const { id, nombre_categoria, marca, detalles } = res;
    registro_contenido.innerHTML = `
    <th scope="row">${id}</th>
      <td>${nombre_categoria}</td>
      <td>${detalles}</td>
      <td>${marca}</td>
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
