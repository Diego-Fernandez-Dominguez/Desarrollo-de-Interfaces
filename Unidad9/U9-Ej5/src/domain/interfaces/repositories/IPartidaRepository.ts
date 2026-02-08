export interface IPartidaRepository {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendJugada(fila: number, columna: number, simbolo: string): Promise<void>;
    recibirJugada(callback: (fila: number, columna: number, simbolo: string) => void): void;
    asignarSimbolo(callback: (simbolo: 'X' | 'O', estado: string) => void): void;
    oponenteDesconectado(callback: () => void): void;
}