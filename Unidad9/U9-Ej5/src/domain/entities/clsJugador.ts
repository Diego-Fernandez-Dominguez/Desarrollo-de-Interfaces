export class clsJugador {
    private _id: string;
    private _simbolo: 'X' | 'O';
    private _connectionId: string;

    constructor(atributos?: { id?: string; simbolo?: 'X' | 'O'; connectionId?: string }) {
        this._id = atributos?.id || '';
        this._simbolo = atributos?.simbolo || 'X';
        this._connectionId = atributos?.connectionId || '';
    }

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get simbolo(): 'X' | 'O' { return this._simbolo; }
    set simbolo(value: 'X' | 'O') { this._simbolo = value; }

    get connectionId(): string { return this._connectionId; }
    set connectionId(value: string) { this._connectionId = value; }
}