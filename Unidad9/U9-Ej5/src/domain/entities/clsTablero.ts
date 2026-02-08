export class clsTablero {
    private _casillas: (string | null)[][];
    private _turnoActual: 'X' | 'O';
    private _estado: 'esperando' | 'jugando' | 'finalizado';
    private _ganador: string | null;
    private _hayEmpate: boolean;

    constructor(atributos?: {
        casillas?: (string | null)[][];
        turnoActual?: 'X' | 'O';
        estado?: 'esperando' | 'jugando' | 'finalizado';
        ganador?: string | null;
        hayEmpate?: boolean;
    }) {
        this._casillas = atributos?.casillas || [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this._turnoActual = atributos?.turnoActual || 'X';
        this._estado = atributos?.estado || 'esperando';
        this._ganador = atributos?.ganador || null;
        this._hayEmpate = atributos?.hayEmpate || false;
    }

    get casillas(): (string | null)[][] { return this._casillas; }
    set casillas(value: (string | null)[][]) { this._casillas = value; }

    get turnoActual(): 'X' | 'O' { return this._turnoActual; }
    set turnoActual(value: 'X' | 'O') { this._turnoActual = value; }

    get estado(): 'esperando' | 'jugando' | 'finalizado' { return this._estado; }
    set estado(value: 'esperando' | 'jugando' | 'finalizado') { this._estado = value; }

    get ganador(): string | null { return this._ganador; }
    set ganador(value: string | null) { this._ganador = value; }

    get hayEmpate(): boolean { return this._hayEmpate; }
    set hayEmpate(value: boolean) { this._hayEmpate = value; }

    verificarGanador(): string | null {
        const lineas = [
            // Filas
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columnas
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonales
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const linea of lineas) {
            const [a, b, c] = linea;
            if (
                this._casillas[a[0]][a[1]] &&
                this._casillas[a[0]][a[1]] === this._casillas[b[0]][b[1]] &&
                this._casillas[a[0]][a[1]] === this._casillas[c[0]][c[1]]
            ) {
                return this._casillas[a[0]][a[1]];
            }
        }

        return null;
    }

    verificarEmpate(): boolean {
        return this._casillas.every(fila => fila.every(casilla => casilla !== null));
    }
}