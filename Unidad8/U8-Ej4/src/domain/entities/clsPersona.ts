
// clsPersona.ts
export class clsPersona {
  private _id: number;
  private _nombre: string;
  private _apellido: string;
  private _fechaNacimiento: Date;

  constructor(id: number, nombre: string, apellido: string, fechaNacimiento: Date) {
    this._id = id;
    this._nombre = nombre;
    this._apellido = apellido;
    this._fechaNacimiento = fechaNacimiento;
  }

  get id() { return this._id; }
  set id(value: number) { this._id = value; }

  get nombre() { return this._nombre; }
  set nombre(value: string) { this._nombre = value; }

  get apellido() { return this._apellido; }
  set apellido(value: string) { this._apellido = value; }

  get fechaNacimiento() { return this._fechaNacimiento; }
  set fechaNacimiento(value: Date) { this._fechaNacimiento = value; }
}
