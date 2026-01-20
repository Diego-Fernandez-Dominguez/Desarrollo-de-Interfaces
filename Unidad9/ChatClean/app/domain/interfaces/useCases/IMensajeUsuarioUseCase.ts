import { clsMensajeUsuario } from '../../entitites/clsMensajeUsuario';

export interface IMensajeUsuarioUseCase {
  crearMensaje(nombre: string, mensaje: string): clsMensajeUsuario;
  validarMensaje(nombre: string, mensaje: string): boolean;
  formatearMensaje(mensaje: clsMensajeUsuario): clsMensajeUsuario;
}
