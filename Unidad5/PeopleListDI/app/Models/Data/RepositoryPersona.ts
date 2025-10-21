import { injectable } from "inversify";
import { Persona } from "../Entities/Persona";

export interface IRepositoryPersonas{
    getListadoCompletoPersonas(): Persona[];
}

@injectable()
export class RepositoryPersona implements IRepositoryPersonas {

private personas: Persona[] = [
    new Persona('1', 'Dario', 'Fernandez'),
    new Persona('2', 'Emilio', 'Salinas'),
    new Persona('3', 'Renata', 'Mendoza'),
    new Persona('4', 'Tomás', 'Rivas'),
    new Persona('5', 'Camila', 'Ortega'),
    new Persona('6', 'Mateo', 'Silva'),
    new Persona('7', 'Lucía', 'Paredes'),
    new Persona('8', 'Santiago', 'Cordero'),
    new Persona('9', 'Paula', 'Vera'),
    new Persona('10', 'Gabriel', 'Fuentes'),
]; 
    getListadoCompletoPersonas(): Persona[] {
        return this.personas;
    }

}

@injectable()
export class RepositoryPersonaEmpty implements IRepositoryPersonas {

private personas: Persona[] = [

]; 
    getListadoCompletoPersonas(): Persona[] {
        return this.personas;
    }

}

@injectable()
export class RepositoryPersona100 implements IRepositoryPersonas {

private personas: Persona[] = [
    new Persona('1', 'Dario', 'Fernandez'),
        new Persona('2', 'Emilio', 'Salinas'),
        new Persona('3', 'Renata', 'Mendoza'),
        new Persona('4', 'Tomás', 'Rivas'),
        new Persona('5', 'Camila', 'Ortega'),
        new Persona('6', 'Mateo', 'Silva'),
        new Persona('7', 'Lucía', 'Paredes'),
        new Persona('8', 'Santiago', 'Cordero'),
        new Persona('9', 'Paula', 'Vera'),
        new Persona('10', 'Gabriel', 'Fuentes'),
        new Persona('11', 'Daniela', 'Peña'),
        new Persona('12', 'Martín', 'Bravo'),
        new Persona('13', 'Julia', 'Campos'),
        new Persona('14', 'Nicolás', 'Aguirre'),
        new Persona('15', 'Sara', 'Molina'),
        new Persona('16', 'Adrián', 'Reyes'),
        new Persona('17', 'Marina', 'Soto'),
        new Persona('18', 'Laura', 'Luzhen'),
        new Persona('19', 'Clara', 'León'),
        new Persona('20', 'Hugo', 'Vargas'),
        new Persona('21', 'Ana', 'Cruz'),
        new Persona('22', 'Javier', 'Gómez'),
        new Persona('23', 'Sofía', 'López'),
        new Persona('24', 'Carlos', 'Martínez'),
        new Persona('25', 'Valeria', 'Hernández'),
        new Persona('26', 'Andrés', 'Jiménez'),
        new Persona('27', 'Isabel', 'Ruiz'),
        new Persona('28', 'Fernando', 'Torres'),
        new Persona('29', 'Victoria', 'Ramos'),
        new Persona('30', 'Pablo', 'Castro'),
        new Persona('31', 'Elena', 'Ortiz'),
        new Persona('32', 'Manuel', 'Morales'),
        new Persona('33', 'Rocío', 'Serrano'),
        new Persona('34', 'Iván', 'Navarro'),
        new Persona('35', 'Claudia', 'Delgado'),
        new Persona('36', 'Álvaro', 'Romero'),
        new Persona('37', 'Natalia', 'Gil'),
        new Persona('38', 'Jorge', 'Méndez'),
        new Persona('39', 'Carmen', 'Iglesias'),
        new Persona('40', 'Luis', 'Vega'),
        new Persona('41', 'Marta', 'Campos'),
        new Persona('42', 'Óscar', 'Guerrero'),
        new Persona('43', 'Alicia', 'Pérez'),
        new Persona('44', 'Diego', 'Santos'),
        new Persona('45', 'Lorena', 'Cabrera'),
        new Persona('46', 'Raúl', 'Flores'),
        new Persona('47', 'Patricia', 'Herrera'),
        new Persona('48', 'Sergio', 'Molina'),
        new Persona('49', 'Beatriz', 'Rojas'),
        new Persona('50', 'Rubén', 'Cortés'),
        new Persona('51', 'Cristina', 'Peña'),
        new Persona('52', 'Eduardo', 'Lara'),
        new Persona('53', 'María', 'Vargas'),
        new Persona('54', 'Francisco', 'Cano'),
        new Persona('55', 'Eva', 'Blanco'),
        new Persona('56', 'Guillermo', 'Paredes'),
        new Persona('57', 'Silvia', 'López'),
        new Persona('58', 'Alberto', 'García'),
        new Persona('59', 'Teresa', 'Martínez'),
        new Persona('60', 'Ricardo', 'Hernández'),
        new Persona('61', 'Ángela', 'Ruiz'),
        new Persona('62', 'Esteban', 'Torres'),
        new Persona('63', 'Carolina', 'Ramos'),
        new Persona('64', 'Fabián', 'Castro'),
        new Persona('65', 'Inés', 'Ortiz'),
        new Persona('66', 'Rodrigo', 'Morales'),
        new Persona('67', 'Mónica', 'Serrano'),
        new Persona('68', 'Samuel', 'Navarro'),
        new Persona('69', 'Andrea', 'Delgado'),
        new Persona('70', 'Héctor', 'Romero'),
        new Persona('71', 'Paola', 'Gil'),
        new Persona('72', 'Vicente', 'Méndez'),
        new Persona('73', 'Noelia', 'Iglesias'),
        new Persona('74', 'Julián', 'Vega'),
        new Persona('75', 'Lidia', 'Campos'),
        new Persona('76', 'Félix', 'Guerrero'),
        new Persona('77', 'Rosa', 'Pérez'),
        new Persona('78', 'Álex', 'Santos'),
        new Persona('79', 'Gloria', 'Cabrera'),
        new Persona('80', 'Marcos', 'Flores'),
        new Persona('81', 'Nuria', 'Herrera'),
        new Persona('82', 'Iván', 'Molina'),
        new Persona('83', 'Celia', 'Rojas'),
        new Persona('84', 'Tomás', 'Cortés'),
        new Persona('85', 'Luz', 'Peña'),
        new Persona('86', 'Pedro', 'Lara'),
        new Persona('87', 'Amelia', 'Vargas'),
        new Persona('88', 'Joaquín', 'Cano'),
        new Persona('89', 'Blanca', 'Blanco'),
        new Persona('90', 'Sebastián', 'Paredes'),
        new Persona('91', 'Irene', 'López'),
        new Persona('92', 'Gonzalo', 'García'),
        new Persona('93', 'Aitana', 'Martínez'),
        new Persona('94', 'Mario', 'Hernández'),
        new Persona('95', 'Elsa', 'Ruiz'),
        new Persona('96', 'Leandro', 'Torres'),
        new Persona('97', 'Jimena', 'Ramos'),
        new Persona('98', 'Saúl', 'Castro'),
        new Persona('99', 'Adriana', 'Ortiz'),
        new Persona('100', 'Ezequiel', 'Morales'),
    ]; 
    getListadoCompletoPersonas(): Persona[] {
        return this.personas;
    }

}