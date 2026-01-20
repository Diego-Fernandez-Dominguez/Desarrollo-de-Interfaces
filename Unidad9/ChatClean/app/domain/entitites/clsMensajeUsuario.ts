// clsDepartamento.ts
export class clsMensajeUsuario {
  private nombre: string;
  private mensaje: string;

  constructor(nombre: string, mensaje: string) {
    this.nombre = nombre;
    this.mensaje = mensaje;
  }

    get _nombre() { return this.nombre; }
    set _nombre(value: string) { this.nombre = value; }

    get _mensaje() { return this.mensaje; }
    set _mensaje(value: string) { this.mensaje = value; }
}
