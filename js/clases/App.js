import { datosCuenta, nuevaCuenta } from "../funciones.js";
import {
  cuentaInput,
  monedaCuentaInput,
  formularioCuenta,
  iconoMenuUser,
  btnNuevaCuenta,
  btnNuevaCategoria,
  btnCerrarFormCuenta,
  btnCerrarFormCategoria,
  menu,
  modalCuenta,
  modalCategoria,
} from "../selectores.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    cuentaInput.addEventListener("change", datosCuenta);
    monedaCuentaInput.addEventListener("change", datosCuenta);

    formularioCuenta.addEventListener("submit", nuevaCuenta);

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
  }
}

export default App;
