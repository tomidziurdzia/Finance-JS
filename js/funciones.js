import Cuentas from "./clases/Cuentas.js";
import UICuentas from "./clases/UI.js";

import {
  cuentaInput,
  monedaCuentaInput,
  formularioCuenta,
  modalCuenta,
} from "./selectores.js";

const uiCuentas = new UICuentas();
const administrarCuentas = new Cuentas();

let editando;

// Objeto con la informacion de la cuenta
const cuentaObj = {
  nombreCuenta: "",
  monedaCuenta: "",
};

// Agrega datos al objeto de cuenta
export function datosCuenta(e) {
  cuentaObj[e.target.name] = e.target.value;
  console.log(cuentaObj);
}

// Valida y agrega nueva cuenta a la clase de cuentas
export function nuevaCuenta(e) {
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

export function reiniciarObjeto() {
  (cuentaObj.nombreCuenta = ""), (cuentaObj.monedaCuenta = "");
}

export function eliminarCuenta(id) {
  // Eliminar la cuenta
  administrarCuentas.eliminarCuenta(id);
  // Mostar un mensaje
  alert("la cita se elimino correctamente");
  //uiCuentas.imprimirAlerta("La cuenta se elimino correctamente");
  // Refrescar las cuentas
  uiCuentas.imprimirCuentas(administrarCuentas);
}

// Carga los datos y el modo edicion
export function cargarEdicion(cuenta) {
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
