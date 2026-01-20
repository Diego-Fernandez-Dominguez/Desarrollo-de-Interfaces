import { IMensajeUsuarioUseCase } from '../interfaces/useCases/IMensajeUsuarioUseCase';
import { clsMensajeUsuario } from '../entitites/clsMensajeUsuario';

export class MensajeUsuarioUseCase implements IMensajeUsuarioUseCase {
  validarMensaje(nombre: string, mensaje: string): boolean {
    if (!nombre || !mensaje) return false;
    if (mensaje.trim().length === 0) return false;
    return true;
  }

  crearMensaje(nombre: string, mensaje: string): clsMensajeUsuario {
    return new clsMensajeUsuario(nombre, mensaje);
  }

  formatearMensaje(mensaje: clsMensajeUsuario): clsMensajeUsuario {
    const nombre = mensaje._nombre.trim();
    const msg = mensaje._mensaje.trim();
    return new clsMensajeUsuario(nombre, msg);
  }
}
