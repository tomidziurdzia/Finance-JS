const d = document;

const iconoMenuUser = d.querySelector("#user__icono");
const menu = d.querySelector("#user__menu");

const btnNuevaCuenta = d.querySelector("#nueva__cuenta");
const modalCuenta = d.querySelector("#modal-cuenta");

const btnCerrarFormCuenta = d.querySelector("#modal-form__cerrar");

iconoMenuUser.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("active");
});

btnNuevaCuenta.addEventListener("click", (e) => {
  e.preventDefault();
  modalCuenta.classList.add("modal-form--show");
});

btnCerrarFormCuenta.addEventListener("click", (e) => {
  e.preventDefault();
  modalCuenta.classList.remove("modal-form--show");
});
