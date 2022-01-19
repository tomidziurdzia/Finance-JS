const d = document;

const iconoMenuUser = d.querySelector("#user__icono");
const menu = d.querySelector("#user__menu");

const btnNuevaCuenta = d.querySelector("#nueva__cuenta");
const btnNuevaCategoria = d.querySelector("#nueva__categoria");
const modalCuenta = d.querySelector("#modal-cuenta");
const modalCategoria = d.querySelector("#modal-categoria");

const btnCerrarFormCuenta = d.querySelector("#modal-form__cerrar-cuenta");
const btnCerrarFormCategoria = d.querySelector("#modal-form__cerrar-categoria");

let editando;

iconoMenuUser.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("active");
});

btnNuevaCuenta.addEventListener("click", (e) => {
  e.preventDefault();
  modalCuenta.classList.add("modal-form--show");
});

btnNuevaCategoria.addEventListener("click", (e) => {
  e.preventDefault();
  modalCategoria.classList.add("modal-form--show");
});

btnCerrarFormCuenta.addEventListener("click", (e) => {
  e.preventDefault();
  modalCuenta.classList.remove("modal-form--show");
});

btnCerrarFormCategoria.addEventListener("click", (e) => {
  e.preventDefault();
  modalCategoria.classList.remove("modal-form--show");
});

/* Leemos los input del formulario */
const cuentaInput = d.querySelector("#nombre-cuenta");
const monedaCuentaInput = d.querySelector("#moneda-cuenta");

// UI
const formularioCuenta = d.querySelector("#formulario-cuenta");
const containerTablaCuenta = d.querySelector("#tabla-container-cuenta");

class Cuentas {
  constructor() {
    this.cuentas = [];
  }

  agregarCuenta(cuenta) {
    this.cuentas = [...this.cuentas, cuenta];
    console.log(this.cuentas);
  }

  eliminarCuenta(idCuenta) {
    this.cuentas = this.cuentas.filter(
      (cuenta) => cuenta.idCuenta !== idCuenta
    );
  }

  editarCuenta(cuentaEditada) {
    this.cuentas = this.cuentas.map((cuenta) =>
      cuenta.idCuenta === cuentaEditada.idCuenta ? cuentaEditada : cuenta
    );
  }
}

class UICuentas {
  imprimirAlerta(mensaje, tipo) {
    // Crear el div
    const divMensaje = d.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agregar clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Agrego el msj al DOM
    formularioCuenta.insertBefore(
      divMensaje,
      d.querySelector(".form__cuenta__botones")
    );

    // Quitar alerta despues de 1 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 1000);
  }

  imprimirCuentas({ cuentas }) {
    this.limpiarHTML();

    cuentas.forEach((cuenta) => {
      const { nombreCuenta, monedaCuenta, idCuenta } = cuenta;

      const trCuenta = d.createElement("tr");
      trCuenta.dataset.idCuenta = idCuenta;

      const divBtns = d.createElement("div");
      divBtns.style.height = "100%";
      divBtns.style.display = "flex";
      divBtns.style.justifyContent = "space-evenly";

      // Scripting de los elementos de la cita
      const tdCuenta = d.createElement("td");
      tdCuenta.textContent = nombreCuenta;

      const tdMonedaCuenta = d.createElement("td");
      tdMonedaCuenta.textContent = monedaCuenta;

      // Boton de eliminar
      const btnEliminar = d.createElement("button");
      btnEliminar.innerHTML = `<img src="../multimedia/botoneraTabla/delete.svg">`;
      btnEliminar.classList.add("btn", "btn-ligth");
      divBtns.appendChild(btnEliminar);

      btnEliminar.onclick = () => {
        eliminarCuenta(idCuenta);
      };

      // Boton de editar
      const btnEditar = d.createElement("button");
      btnEditar.innerHTML = `<img src="../multimedia/botoneraTabla/edit.svg">`;
      btnEditar.classList.add("btn", "btn-ligth");
      divBtns.appendChild(btnEditar);

      btnEditar.onclick = () => {
        cargarEdicion(cuenta);
      };

      // Agrego los TD al TR
      trCuenta.appendChild(tdCuenta);
      trCuenta.appendChild(tdMonedaCuenta);
      trCuenta.appendChild(divBtns);

      // Agregar la cuenta al HTML
      containerTablaCuenta.appendChild(trCuenta);
    });
  }

  limpiarHTML() {
    while (containerTablaCuenta.firstChild) {
      containerTablaCuenta.removeChild(containerTablaCuenta.firstChild);
    }
  }
}

const uiCuentas = new UICuentas();
const administrarCuentas = new Cuentas();

//Registrar eventos
eventListeners();
function eventListeners() {
  cuentaInput.addEventListener("change", datosCita);
  monedaCuentaInput.addEventListener("change", datosCita);

  formularioCuenta.addEventListener("submit", nuevaCuenta);
}

// Objeto con la informacion de la cuenta
const cuentaObj = {
  nombreCuenta: "",
  monedaCuenta: "",
};

// Agrega datos al objeto de cuenta
function datosCita(e) {
  cuentaObj[e.target.name] = e.target.value;
  console.log(cuentaObj);
}

// Valida y agrega nueva cuenta a la clase de cuentas
function nuevaCuenta(e) {
  e.preventDefault();

  // Extraigo la informacion del objeto de cuentas
  const { nombreCuenta, monedaCuenta } = cuentaObj;

  // Validar
  if (nombreCuenta === "" || monedaCuenta === "Vacio" || monedaCuenta === "") {
    uiCuentas.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (editando) {
    alert("se edito correctamente");

    // Pasar el objeto de la cuenta a edicion
    administrarCuentas.editarCuenta({ ...cuentaObj });

    //Regresar el titulo al estado original
    modalCuenta.querySelector(".modal-form__title").textContent = "Crear Cita";

    // Quitar modo edicion
    editando = false;
  } else {
    // Generar ID unico
    cuentaObj.idCuenta = Date.now();

    // Creando nueva cita
    administrarCuentas.agregarCuenta({ ...cuentaObj });

    // Mensaje de agregado correctamente
    alert("se agrego correctamente");
  }

  // Reiniciando objeto para la validacion
  reiniciarObjeto();

  // Reinicia formulario
  formularioCuenta.reset();

  // Mostrar la cuenta en el HTML
  uiCuentas.imprimirCuentas(administrarCuentas);

  // Cierro el form una vez que creo la cuenta
  modalCuenta.classList.remove("modal-form--show");
}

function reiniciarObjeto() {
  (cuentaObj.nombreCuenta = ""), (cuentaObj.monedaCuenta = "");
}

function eliminarCuenta(id) {
  // Eliminar la cuenta
  administrarCuentas.eliminarCuenta(id);
  // Mostar un mensaje
  alert("la cita se elimino correctamente");
  //uiCuentas.imprimirAlerta("La cuenta se elimino correctamente");
  // Refrescar las cuentas
  uiCuentas.imprimirCuentas(administrarCuentas);
}

// Carga los datos y el modo edicion
function cargarEdicion(cuenta) {
  // Abril el modal
  modalCuenta.classList.add("modal-form--show");

  const { nombreCuenta, monedaCuenta, idCuenta } = cuenta;

  // Llenar los inputs
  cuentaInput.value = nombreCuenta;
  monedaCuentaInput.value = monedaCuenta;

  // Llenar el objeto
  cuentaObj.nombreCuenta = nombreCuenta;
  cuentaObj.monedaCuenta = monedaCuenta;
  cuentaObj.idCuenta = idCuenta;

  // Cambiar el texto del formulario AÑADIR por EDITAR
  modalCuenta.querySelector(".modal-form__title").textContent = "Editar Cuenta";

  editando = true;
}
