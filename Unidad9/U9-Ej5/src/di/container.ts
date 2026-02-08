import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { IPartidaRepository } from '../domain/interfaces/repositories/IPartidaRepository';
import { IUseCaseJuego } from '../domain/interfaces/useCases/IUseCaseJuego';
import { PartidaRepository } from '../data/repositories/PartidaRepository';
import { UseCaseJuego } from '../domain/useCases/UseCaseJuego';
import { SignalRConnection } from '../data/datasources/signalr/SignalRConnection';

const container = new Container();

container.bind<SignalRConnection>(TYPES.SignalRConnection).to(SignalRConnection).inSingletonScope();
container.bind<IPartidaRepository>(TYPES.IPartidaRepository).to(PartidaRepository).inSingletonScope();
container.bind<IUseCaseJuego>(TYPES.IUseCaseJuego).to(UseCaseJuego).inSingletonScope();

export { container };