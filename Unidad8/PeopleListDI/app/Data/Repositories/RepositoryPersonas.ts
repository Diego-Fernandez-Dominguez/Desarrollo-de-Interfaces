import { IRepositoryPersonas } from "@/app/Domain/Interfaces/Repositories/IRepositoryPersonas";
import { clsPersona } from "@/app/Domain/Entities/clsPersona";
import { injectable } from "inversify";

@injectable()
export class RepositoryPersonas implements IRepositoryPersonas {

    getListadoCompletoPersonas(): clsPersona[] {
        const imagen = "https://media.istockphoto.com/id/183422512/es/foto/manzanas-rojas-frescas-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=N4NDC0ClXKIKow18XJXsWw1aukJGQR9qHq9O0UXqtyI=";

        return [
            new clsPersona(0,'Fernando','Galiana', new Date("2000-01-01"), imagen, "60147583", 1),
            new clsPersona(1,'Carlos','Martínez', new Date("1995-03-12"), imagen, "60147584", 2),
            new clsPersona(2,'Ana','Rodríguez', new Date("1998-07-05"), imagen, "60147585", 3),
            new clsPersona(3,'Miguel','Sánchez', new Date("1992-11-20"), imagen, "60147586", 4),
            new clsPersona(4,'Laura','Torres', new Date("1997-06-15"), imagen, "60147587", 5),
            new clsPersona(5,'David','Moreno', new Date("1990-02-28"), imagen, "60147588", 6),
            new clsPersona(6,'Elena','García', new Date("2001-09-09"), imagen, "60147589", 7),
            new clsPersona(7,'Javier','López', new Date("1988-12-31"), imagen, "60147590", 8)
        ];
    }
}
