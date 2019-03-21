import path from 'path';
const filewatcher = require('filewatcher');

module.exports = (io: SocketIO.Server) => {
  io.on('connection', (socket: SocketIO.Socket) => {
    if (process.env.ENV === 'development') {
      addFileWatcher(io);
    }
  });
}

function addFileWatcher(io: SocketIO.Server) {
  const watcher = filewatcher();
  watcher.add(path.join(__dirname, '../../static/js/bundle.js'));
  watcher.on('change', () => {
    io.emit('reload');
  });
}