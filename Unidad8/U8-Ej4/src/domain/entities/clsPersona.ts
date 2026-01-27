export class clsPersona {
  private _id: number;
  private _nombre: string;
  private _apellido: string;
  private _fechaNacimiento: Date;
  private _idDepartamento: number;
  private _imagen?: string;
  private _direccion?: string;
  private _telefono?: string;

  constructor(
    id: number = 0,
    nombre: string = '',
    apellido: string = '',
    fechaNacimiento: Date = new Date(),
    idDepartamento: number = 0,
    foto?: string,
    direccion?: string,
    telefono?: string
  ) {
    this._id = id;
    this._nombre = nombre;
    this._apellido = apellido;
    this._fechaNacimiento = fechaNacimiento;
    this._idDepartamento = idDepartamento;
    this._imagen = foto;
    this._direccion = direccion;
    this._telefono = telefono;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get nombre(): string { return this._nombre; }
  set nombre(value: string) { this._nombre = value; }

  get apellido(): string { return this._apellido; }
  set apellido(value: string) { this._apellido = value; }

  get fechaNacimiento(): Date { return this._fechaNacimiento; }
  set fechaNacimiento(value: Date) { this._fechaNacimiento = value; }

  get idDepartamento(): number { return this._idDepartamento; }
  set idDepartamento(value: number) { this._idDepartamento = value; }

  get imagen(): string | undefined { return this._imagen; }
  set imagen(value: string | undefined) { this._imagen = value; }

  get direccion(): string | undefined { return this._direccion; }
  set direccion(value: string | undefined) { this._direccion = value; }

  get telefono(): string | undefined { return this._telefono; }
  set telefono(value: string | undefined) { this._telefono = value; }

  get edad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this._fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - this._fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < this._fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}
