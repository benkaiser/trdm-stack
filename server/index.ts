import { config as DotEnvConfig } from 'dotenv';
DotEnvConfig();
import assert from 'assert';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import session from 'express-session';
import path from 'path';
import {createConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

var MySQLStore = require('express-mysql-session')(session);

var options: any = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB || 'app'
}
var sessionStore;

if (process.env.DATABASE_URL) {
  const dbURL = new URL(process.env.DATABASE_URL);
  options.host = dbURL.hostname;
  options.port = dbURL.port;
  options.username = dbURL.username;
  options.password = dbURL.password;
  options.database = dbURL.pathname.substr(1);
}

sessionStore = new MySQLStore({
  ...options,
  user: options.username
});

createConnection({
  type: 'mariadb',
  ...options,
  entities: [ /* models */ ],
  synchronize: true /* set to false for prod */,
  charset: 'utf8mb4'
} as MysqlConnectionOptions).then(() => {
  console.log('Connected to DB');
});

sessionStore.on('error', (error: Error) => {
  assert.ifError(error);
  assert.ok(false);
});

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

app.set('view engine', 'pug');
app.set('views', path.resolve('./server/views'));
app.use('/static', express.static(path.resolve('./static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  cookie: {
    secure: process.env.ENV != 'development'
  },
  resave: false,
  name: 'app-next',
  saveUninitialized: true,
  secret: 'Super Secret Secret',
  store: sessionStore
}));
app.use(require('./controllers'));
require('./controllers/socketio')(io);

server.listen(process.env.PORT || 5656, function() {
  console.log("Let's get this party started!");
});

