import * as signalR from '@microsoft/signalr';
import { IMensajeUsuarioUseCase } from '../../domain/interfaces/useCases/IMensajeUsuarioUseCase';
import { clsMensajeUsuario } from '../../domain/entitites/clsMensajeUsuario';

export class ChatGrupalVM {
  private useCase: IMensajeUsuarioUseCase;
  private hubUrl: string;
  private connection: signalR.HubConnection | null = null;

  private _conexion: boolean = false;
  private _listaMensajes: clsMensajeUsuario[] = [];

  private _nombreActual: string = '';
  private _mensajeActual: string = '';

  constructor(useCase: IMensajeUsuarioUseCase, hubUrl: string) {
    this.useCase = useCase;
    this.hubUrl = hubUrl;
  }

  get conexion(): boolean {
    return this._conexion;
  }

  getListaMensajes(): clsMensajeUsuario[] {
    return this._listaMensajes;
  }

  getMensaje(): clsMensajeUsuario {
    return new clsMensajeUsuario(this._nombreActual, this._mensajeActual);
  }

  setNombre(nombre: string) {
    this._nombreActual = nombre;
  }

  setMensaje(mensaje: string) {
    this._mensajeActual = mensaje;
  }

  async comenzarConexion(
    onMensajesActualizados: (mensajes: clsMensajeUsuario[]) => void,
    onConexionCambiada: (conexion: boolean) => void
  ): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveMessage', (msg: { nombre: string; mensaje: string }) => {
      const nuevo = new clsMensajeUsuario(msg.nombre, msg.mensaje);
      this._listaMensajes = [...this._listaMensajes, nuevo];
      onMensajesActualizados(this._listaMensajes);
    });

    try {
      await this.connection.start();
      this._conexion = true;
      onConexionCambiada(true);
    } catch (e) {
      console.log('Error al conectar con SignalR', e);
      this._conexion = false;
      onConexionCambiada(false);
    }
  }

  async apretarBoton(
    onMensajesActualizados: (mensajes: clsMensajeUsuario[]) => void
  ): Promise<void> {
    const nombre = this._nombreActual;
    const mensaje = this._mensajeActual;

    if (!this.useCase.validarMensaje(nombre, mensaje)) {
      console.log('Mensaje no válido');
      return;
    }

    const msg = this.useCase.crearMensaje(nombre, mensaje);
    const formateado = this.useCase.formatearMensaje(msg);

    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke('SendMessage', {
        nombre: formateado._nombre,
        mensaje: formateado._mensaje,
      });
    }

    this._mensajeActual = '';
    onMensajesActualizados(this._listaMensajes);
  }
}
