import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IPartidaRepository } from '../../domain/interfaces/repositories/IPartidaRepository';
import { SignalRConnection } from '../datasources/signalr/SignalRConnection';
import { TYPES } from '../../di/types';

@injectable()
export class PartidaRepository implements IPartidaRepository {
    constructor(
        @inject(TYPES.SignalRConnection) private signalR: SignalRConnection
    ) {}

    async connect(): Promise<void> {
        return this.signalR.connect();
    }

    async disconnect(): Promise<void> {
        return this.signalR.disconnect();
    }

    async sendJugada(fila: number, columna: number, simbolo: string): Promise<void> {
        return this.signalR.invoke('EnviarJugada', fila, columna, simbolo);
    }

    recibirJugada(callback: (fila: number, columna: number, simbolo: string) => void): void {
        this.signalR.on('RecibirJugada', callback);
    }

    asignarSimbolo(callback: (simbolo: 'X' | 'O', estado: string) => void): void {
        this.signalR.on('AsignarSimbolo', callback);
    }

    oponenteDesconectado(callback: () => void): void {
        this.signalR.on('OponenteDesconectado', callback);
    }
}