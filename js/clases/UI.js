import { eliminarCuenta, cargarEdicion } from "../funciones.js";
import { d, formularioCuenta, containerTablaCuenta } from "../selectores.js";
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

export default UICuentas;
