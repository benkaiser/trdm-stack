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

var options = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB || 'app'
}

createConnection({
  type: 'mariadb',
  host: options.host,
  port: options.port,
  username: options.user,
  password: options.password,
  database: options.database,
  entities: [/* Models */],
  synchronize: true, // set this to false for prod
  charset: 'utf8mb4'
} as MysqlConnectionOptions).then(() => {
  console.log('Connected to DB');
});

var sessionStore = new MySQLStore(options);

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

