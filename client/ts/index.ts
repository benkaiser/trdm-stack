import RootView from './views/root';
const scss = require('../scss/main.scss');
import SocketManager from './services/SocketManager';
import LinkInterceptor from './services/linkInterceptor';

class Loader {
  static loadAll() {
    SocketManager.initialise();
    LinkInterceptor.initialise();
    RootView.initialise();
  }
}

Loader.loadAll();
