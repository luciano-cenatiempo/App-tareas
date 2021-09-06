const $btnGuardar = document.querySelector('#btn-guardar');
const $btnBuscar = document.querySelector('#btn-buscar');
const $inputBuscar = document.querySelector('#input-buscar');
const $txtTitulo = document.querySelector("#txt-titulo");
const $txtDetalle = document.querySelector("#txt-detalle");
const $formTarea = document.querySelector('#form_tarea');
const $contenedorTareas = document.querySelector('#contenedor-tareas')
let idParaEditar;
let modifico = false;

document.addEventListener('DOMContentLoaded', () => {
    obtenerTareas();
    $btnGuardar.addEventListener('click', function (e) {
        e.preventDefault();
        if (modifico) {
            modificarTarea();
            modifico = false;
        } else {
            guardarTarea();
        }
    });

    $btnBuscar.addEventListener('click', function (e) {
        e.preventDefault();
        borrarTabla();
        let datoBuscar = $inputBuscar.value;
        if (datoBuscar == '') {
            obtenerTareas();
        } else {
            buscarTareas(datoBuscar);
        }
    });
});

function buscarTareas(datoBuscar) {
    $.ajax({
        method: "POST",
        url: "pages/search-tareas.php",
        data: { dato: datoBuscar }
    })
        .done(function (respuesta) {
            borrarAlertayVolver();
            if (respuesta === "CERO RESULTADOS") {
                borrarTabla();
                const mensaje = document.createElement('div');
                mensaje.textContent = 'No se encontraron tareas';
                mensaje.classList.add('mensaje', 'alert', 'alert-danger', 'mt-4', 'text-center')
                $contenedorTareas.appendChild(mensaje);
            } else {
                borrarTabla();
                dibujarTabla(JSON.parse(respuesta));
            }
            const $btnVolver = document.createElement('button');
            $btnVolver.classList.add('btn', 'btn-secondary', 'text-center', 'mt-3', 'm-auto', 'btn-volver','d-block');
            $btnVolver.textContent = 'Volver';
            $contenedorTareas.appendChild($btnVolver)
            $btnVolver.onclick = function () {
                obtenerTareas();

            }
        });
}

function dibujarTabla(tareas) {
    tareas.forEach(({ id, titulo, detalle }) => {
        const $tarea_card = document.createElement('div');
        const $tarea_header = document.createElement('div');
        const $tarea_titulo = document.createElement('h5');
        const $tarea_id = document.createElement('span');
        const $tarea_body = document.createElement('div');
        const $tarea_detalle = document.createElement('p');
        const $tarea_contenedor_botones = document.createElement('div');
        const $tarea_btnEditar = document.createElement('button');
        const $tarea_btnEliminar = document.createElement('button');

        $tarea_card.classList.add('card', 'col-md-10', 'col-sm-12', 'mt-3', 'max-w-75', 'm-auto');
        $tarea_header.classList.add('card-header', 'd-flex', 'justify-content-between', 'bg-beige');
        $tarea_titulo.textContent = titulo;
        $tarea_id.textContent = `Tarea # ${id} `;
        $tarea_header.appendChild($tarea_titulo);
        $tarea_header.appendChild($tarea_id);
        $tarea_body.classList.add('card-body');
        $tarea_detalle.textContent = detalle;
        $tarea_contenedor_botones.classList.add('d-flex', 'flex-row-reverse');

        $tarea_btnEditar.classList.add('btn-primary', 'btn', 'btn-editar', 'mr-3')
        $tarea_btnEditar.title = 'Editar Tarea';
        $tarea_btnEditar.dataset.codigo = id;
        $tarea_btnEditar.innerHTML = `<i class="fas fa-edit"></i></button>`;
        $tarea_btnEditar.onclick = e => {
            e.preventDefault();
            obtenerTarea(id);
            window.scroll(top);
        }

        $tarea_btnEliminar.classList.add('btn-danger', 'btn', 'btn-eliminar', 'mx-3');
        $tarea_btnEliminar.title = 'Eliminar Tarea';
        $tarea_btnEliminar.dataset.codigo = id;
        $tarea_btnEliminar.dataset.titulo = titulo;
        $tarea_btnEliminar.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        $tarea_btnEliminar.onclick = e => {
            e.preventDefault();
            eliminarTarea(id, titulo);
        }

        $tarea_contenedor_botones.appendChild($tarea_btnEditar);
        $tarea_contenedor_botones.appendChild($tarea_btnEliminar);
        $tarea_body.appendChild($tarea_detalle);
        $tarea_body.appendChild($tarea_contenedor_botones);
        $tarea_card.appendChild($tarea_header);
        $tarea_card.appendChild($tarea_body);
        $contenedorTareas.appendChild($tarea_card);
    });
}

function borrarAlertayVolver() {
    const $btnVolver = document.querySelector('.btn-volver');
    const $mensaje = document.querySelector('.mensaje');
    if ($btnVolver) {
        $contenedorTareas.removeChild($btnVolver);
    }
    if ($mensaje) {
        $contenedorTareas.removeChild($mensaje);
    }
    return;
}

function borrarTabla() {
    while ($contenedorTareas.firstChild) {
        $contenedorTareas.removeChild($contenedorTareas.firstChild);
    }
}
function imprimirAlerta(tipo, mensaje) {
    const existeAlerta = document.querySelector('.mensaje-formulario');
    if (!existeAlerta) {
        const $tarjeta = document.querySelector('.tarjeta');
        const $divMensaje = document.createElement('div');
        $divMensaje.textContent = mensaje;
        if (tipo === 'error') {
            $divMensaje.classList.add('mensaje-formulario', 'alert', 'alert-danger', 'text-center', 'py-3');

        } else {
            $divMensaje.classList.add('mensaje-formulario', 'alert', 'alert-success', 'text-center', 'py-3');

        }
        $tarjeta.appendChild($divMensaje);

        setTimeout(() => {
            $tarjeta.removeChild($tarjeta.lastChild);
        }, 4000);
    }


}

function modificarTarea() {
    let id = idParaEditar;
    titulo = $txtTitulo.value;
    detalle = $txtDetalle.value;
    const $btnCancelar = document.querySelector('.btn-cancelar');
    $formTarea.removeChild($btnCancelar)
    if (titulo.trim() === '' || detalle.trim() === '') {
        imprimirAlerta('error', 'Error! Uno o más campos estan vacíos.')
    } else {
        $.ajax({
            method: "POST",
            url: "pages/edit-tarea.php",
            data: { codigo: id, titulo: titulo, detalle: detalle }
        })
            .done(function (respuesta) {
                $formTarea.reset();
                if (respuesta === "La tarea se modificó con exito") {
                    imprimirAlerta('success', respuesta);
                } else {
                    imprimirAlerta('error', respuesta);
                }
                $btnGuardar.textContent = 'Guardar Tarea';
                obtenerTareas();
            });
    }
}

function obtenerTarea(idTarea) {
    $btnGuardar.textContent = `Modificar la tarea ${idTarea}`
    const existeBtnCancelar = document.querySelector('.btn-cancelar');
    if (!existeBtnCancelar) {
        const $btnCancelar = document.createElement('button');
        $btnCancelar.textContent = 'Cancelar Modificación';
        $btnCancelar.classList.add('btn-danger', 'w-100', 'mb-3', 'btn', 'btn-cancelar');
        $btnCancelar.onclick = () => {
            modifico = false;
            $formTarea.reset();
            $formTarea.removeChild($btnCancelar);
            $btnGuardar.textContent = 'Guardar Tarea'
        }
        $formTarea.appendChild($btnCancelar)
    }
    $.ajax({
        method: "POST",
        url: "pages/get-one-tarea.php",
        data: { codigo: idTarea }
    })
        .done(function (response) {
            const tarea = JSON.parse(response);
            const { id, titulo, detalle } = tarea;
            idParaEditar = id;
            $txtTitulo.value = titulo;
            $txtDetalle.value = detalle;
            modifico = true;
        })
}

function obtenerTareas() {
    borrarAlertayVolver();
    $.ajax({
        method: "POST",
        url: "pages/get-tareas.php",
    })
        .done(function (respuesta) {
            borrarTabla();
            dibujarTabla(JSON.parse(respuesta));
        });
}

function guardarTarea() {
    let titulo = $txtTitulo.value;
    let detalle = $txtDetalle.value;
    if (titulo.trim() === '' || detalle.trim() === '') {
        imprimirAlerta('error', 'Error! Uno o más campos está vacío.')
    } else {
        $.ajax({
            method: "POST",
            url: "pages/add-tareas.php",
            data: { titu: titulo, deta: detalle }
        })
            .done(function (respuesta) {
                obtenerTareas();
                $formTarea.reset();
                if (respuesta === "La tarea se agregó con exito") {
                    imprimirAlerta('success', respuesta);
                } else {
                    imprimirAlerta('error', respuesta);
                }
            });
    }
    return;

}

function eliminarTarea(codigoTarea, tituloTarea) {
    let confirmacion = confirm(`¿Deseas eliminar la tarea Nº ${codigoTarea}: ${tituloTarea}?`);
    if (confirmacion) {
        $.ajax({
            method: "POST",
            url: "pages/delete-tareas.php",
            data: { codigo: codigoTarea }
        })
            .done(function (respuesta) {
                obtenerTareas();
                alert(respuesta);
                window.scroll(top);

            });
    }
}