export class Persona {
    private id: string;
    private nombre: string;
    private apellido: string;

    constructor(id: string, nombre: string, apellido: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public getId(): string {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }
    
    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }
}

export default Persona;