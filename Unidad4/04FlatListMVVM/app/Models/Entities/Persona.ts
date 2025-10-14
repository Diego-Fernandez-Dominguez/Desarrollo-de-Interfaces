export class Persona {

    private id: string;
    private nombre: string;
    private apellido: string;

    constructor(id: string, nombre: string, apellido: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }
    public get Id(): string {
        return this.id;
    }
    public get Nombre(): string {
        return this.nombre;
    }
    public get Apellido(): string {
        return this.apellido;
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }
}