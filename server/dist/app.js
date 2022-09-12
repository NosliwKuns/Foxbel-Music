"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const index_1 = __importDefault(require("./routes/index"));
// settings
app.set('port', 4000);
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
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
app.use(index_1.default);
database_1.default.sync().then(() => {
    console.log('Database synced successfully');
}).catch((err) => {
    console.log('Err', err);
});
exports.default = app;
