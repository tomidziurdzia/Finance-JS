const d = document;

const iconoMenuUser = d.querySelector("#user__icono");
const menu = d.querySelector("#user__menu");

iconoMenuUser.addEventListener("click", (e) => {
  menu.classList.toggle("active");
});
