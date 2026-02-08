import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IUseCaseJuego } from '../interfaces/useCases/IUseCaseJuego';
import { IPartidaRepository } from '../interfaces/repositories/IPartidaRepository';
import { TYPES } from '../../di/types';

@injectable()
export class UseCaseJuego implements IUseCaseJuego {
    constructor(
        @inject(TYPES.IPartidaRepository) private repository: IPartidaRepository
    ) {}

    async connect(): Promise<void> {
        return this.repository.connect();
    }

    async disconnect(): Promise<void> {
        return this.repository.disconnect();
    }

    async sendJugada(fila: number, columna: number, simbolo: string): Promise<void> {
        return this.repository.sendJugada(fila, columna, simbolo);
    }

    recibirJugada(callback: (fila: number, columna: number, simbolo: string) => void): void {
        this.repository.recibirJugada(callback);
    }

    asignarSimbolo(callback: (simbolo: 'X' | 'O', estado: string) => void): void {
        this.repository.asignarSimbolo(callback);
    }

    oponenteDesconectado(callback: () => void): void {
        this.repository.oponenteDesconectado(callback);
    }
}