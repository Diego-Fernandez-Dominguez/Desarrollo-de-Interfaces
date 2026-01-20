import { MensajeUsuarioUseCase } from '../domain/useCases/MensajeUsuarioUseCase';
import { IMensajeUsuarioUseCase } from '../domain/interfaces/useCases/IMensajeUsuarioUseCase';
import { ChatGrupalVM } from '../presentation/viewmodels/ChatGrupalVM';

export const buildMensajeUsuarioUseCase = (): IMensajeUsuarioUseCase => {
  return new MensajeUsuarioUseCase();
};

export const buildChatGrupalVM = (hubUrl: string): ChatGrupalVM => {
  const useCase = buildMensajeUsuarioUseCase();
  return new ChatGrupalVM(useCase, hubUrl);
};
