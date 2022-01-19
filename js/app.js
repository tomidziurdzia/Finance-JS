const d = document;

const iconoMenuUser = d.querySelector("#user__icono");
const menu = d.querySelector("#user__menu");

const btnNuevaCuenta = d.querySelector("#nueva__cuenta");
const btnNuevaCategoria = d.querySelector("#nueva__categoria");
const modalCuenta = d.querySelector("#modal-cuenta");
const modalCategoria = d.querySelector("#modal-categoria");

const btnCerrarFormCuenta = d.querySelector("#modal-form__cerrar-cuenta");
const btnCerrarFormCategoria = d.querySelector("#modal-form__cerrar-categoria");

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
