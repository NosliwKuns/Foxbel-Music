import { Pool } from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { Users } from './models/users';

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "javascript1973",
  database: "users-music",
  logging: false,
  models: [Users],
})


export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'javascript1973',
  database: 'users-music',
  port: 5432,
});

export default connection;