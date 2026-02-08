import { clsJugador } from './clsJugador';
import { clsTablero } from './clsTablero';

export class clsPartida {
    private _id: string;
    private _jugador1: clsJugador | null;
    private _jugador2: clsJugador | null;
    private _tablero: clsTablero;
    private _fechaInicio: Date;

    constructor(atributos?: {
        id?: string;
        jugador1?: clsJugador | null;
        jugador2?: clsJugador | null;
        tablero?: clsTablero;
        fechaInicio?: Date;
    }) {
        this._id = atributos?.id || '';
        this._jugador1 = atributos?.jugador1 || null;
        this._jugador2 = atributos?.jugador2 || null;
        this._tablero = atributos?.tablero || new clsTablero();
        this._fechaInicio = atributos?.fechaInicio || new Date();
    }

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get jugador1(): clsJugador | null { return this._jugador1; }
    set jugador1(value: clsJugador | null) { this._jugador1 = value; }

    get jugador2(): clsJugador | null { return this._jugador2; }
    set jugador2(value: clsJugador | null) { this._jugador2 = value; }

    get tablero(): clsTablero { return this._tablero; }
    set tablero(value: clsTablero) { this._tablero = value; }

    get fechaInicio(): Date { return this._fechaInicio; }
    set fechaInicio(value: Date) { this._fechaInicio = value; }

    estaCompleta(): boolean {
        return this._jugador1 !== null && this._jugador2 !== null;
    }

    obtenerJugadorPorSimbolo(simbolo: 'X' | 'O'): clsJugador | null {
        if (this._jugador1?.simbolo === simbolo) return this._jugador1;
        if (this._jugador2?.simbolo === simbolo) return this._jugador2;
        return null;
    }
}