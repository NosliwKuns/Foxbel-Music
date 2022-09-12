import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import connection from './database';
import cors  from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();

import indexRoutes from './routes/index';

// settings
app.set('port', 4000);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// routes
app.use(indexRoutes)

connection.sync().then(() => {
  console.log('Database synced successfully')
}).catch((err) => {
  console.log('Err', err);
});

export default app;