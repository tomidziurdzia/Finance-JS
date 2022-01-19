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

export default Cuentas;
