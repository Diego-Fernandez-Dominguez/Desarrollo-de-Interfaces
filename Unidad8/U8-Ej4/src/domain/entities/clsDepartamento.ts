// clsDepartamento.ts
export class clsDepartamento {
  private _id: number;
  private _nombre: string;

  constructor(id: number, nombre: string) {
    this._id = id;
    this._nombre = nombre;
  }

  get id() { return this._id; }
  set id(value: number) { this._id = value; }

  get nombre() { return this._nombre; }
  set nombre(value: string) { this._nombre = value; }
}
