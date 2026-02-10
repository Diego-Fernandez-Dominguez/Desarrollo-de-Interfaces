import { makeAutoObservable } from 'mobx';
import { container } from '../../di/container';
import { TYPES } from '../../di/types';
import { clsJugador } from '../../domain/entities/clsJugador';
import { clsPartida } from '../../domain/entities/clsPartida';
import { clsTablero } from '../../domain/entities/clsTablero';
import { IUseCaseJuego } from '../../domain/interfaces/useCases/IUseCaseJuego';

export class PartidaViewModel {
    private useCase: IUseCaseJuego;
    partida: clsPartida;
    miSimbolo: 'X' | 'O' | null = null;
    mensaje: string = '';

    constructor() {
        this.useCase = container.get<IUseCaseJuego>(TYPES.IUseCaseJuego);
        this.partida = new clsPartida({
            tablero: new clsTablero()
        });
        makeAutoObservable(this);
    }

    async conectar(): Promise<void> {
        await this.useCase.connect();
        
        this.useCase.asignarSimbolo((simbolo, estado) => {
            this.miSimbolo = simbolo;
            const jugador = new clsJugador({ simbolo });
            
            if (simbolo === 'X') {
                this.partida.jugador1 = jugador;
            } else {
                this.partida.jugador2 = jugador;
            }

            if (estado === 'esperando') {
                this.partida.tablero.estado = 'esperando';
                this.mensaje = 'Esperando oponente...';
            } else {
                this.partida.tablero.estado = 'jugando';
                this.mensaje = this.miSimbolo === 'X' ? 'Tu turno' : 'Turno del oponente';
            }
        });

        this.useCase.recibirJugada((fila, columna, simbolo) => {
            this.partida.tablero.casillas[fila][columna] = simbolo;
            this.partida.tablero.turnoActual = this.miSimbolo!;
            this.verificarEstadoJuego();
        });

        this.useCase.oponenteDesconectado(() => {
            this.mensaje = 'El oponente se ha desconectado';
            this.partida.tablero.estado = 'finalizado';
        });
    }

    async realizarJugada(fila: number, columna: number): Promise<void> {
        if (
            this.partida.tablero.estado !== 'jugando' ||
            this.partida.tablero.turnoActual !== this.miSimbolo ||
            this.partida.tablero.casillas[fila][columna] !== null
        ) {
            return;
        }

        this.partida.tablero.casillas[fila][columna] = this.miSimbolo;
        await this.useCase.sendJugada(fila, columna, this.miSimbolo!);
        
        this.partida.tablero.turnoActual = this.miSimbolo === 'X' ? 'O' : 'X';
        this.verificarEstadoJuego();
    }

    private verificarEstadoJuego(): void {
        const ganador = this.partida.tablero.verificarGanador();
        
        if (ganador) {
            this.partida.tablero.ganador = ganador;
            this.partida.tablero.estado = 'finalizado';
            this.mensaje = ganador === this.miSimbolo ? '¡Has ganado!' : 'Has perdido';
        } else if (this.partida.tablero.verificarEmpate()) {
            this.partida.tablero.hayEmpate = true;
            this.partida.tablero.estado = 'finalizado';
            this.mensaje = 'Empate';
        } else {
            this.mensaje = this.partida.tablero.turnoActual === this.miSimbolo 
                ? 'Tu turno' 
                : 'Turno del oponente';
        }
    }

    async desconectar(): Promise<void> {
        await this.useCase.disconnect();
    }
}