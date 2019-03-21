import * as io from 'socket.io-client';
import env from '../env';

class SocketManager {
  private _socket: SocketIOClient.Socket;
  private _resolveAction: { [key: string]: (value: any) => void};

  constructor() {
    this._resolveAction = {};
  }

  public initialise() {
    this._socket = io();
    this._socket.on( 'connect', () => {
      console.log('connected');
    });
    if (env.ENV == 'development') {
      console.log('development');      
      this._socket.on('reload', () => {
        window.location.href = window.location.href;
      });
      this._socket.on('reconnect', () => {
        window.location.href = window.location.href;
      });
    }
  }

  public action(actionData: any): any {
    this._socket.emit('action', actionData);
    return new Promise(resolve => this._resolveAction[actionData.type] = resolve);
  }
}

export default new SocketManager();