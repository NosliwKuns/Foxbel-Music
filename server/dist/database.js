"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("./models/users");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "javascript1973",
    database: "users-music",
    logging: false,
    models: [users_1.Users],
});
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'javascript1973',
    database: 'users-music',
    port: 5432,
});
exports.default = connection;
