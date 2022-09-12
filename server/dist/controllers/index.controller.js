"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImg = exports.updateUser = exports.profile = exports.signin = exports.createUser = exports.getUsers = exports.fileUpload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("./../models/users");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const diskstorage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-space-' + file.originalname);
    }
});
exports.fileUpload = (0, multer_1.default)({
    storage: diskstorage,
}).single('image');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.Users.findAll();
    return res
        .status(200)
        .json(users);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, lastname, email, gender, phonenumber, password, picture } = req.body;
    console.log(req.file);
    const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = req.file && (yield cloudinary_1.default.uploader.upload(path));
    // bcrypt.hash(password, 10, async (err, hash) => {
    const user = {
        name,
        email,
        gender,
        lastname,
        phonenumber,
        password,
        picture: result ? result.secure_url : null
    };
    const usera = yield users_1.Users.create(user);
    // token
    const token = jsonwebtoken_1.default.sign({ _id: usera.id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    });
    res.cookie('auth-token', token);
    res.header('auth-token', token).json(usera);
    // })
});
exports.createUser = createUser;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_1.Users.findOne({
            where: { email, password }
        });
        if (!user)
            return res.status(400).json('Email or password is wrong');
        // bcrypt.compare(password, user.password, (err, result) => {
        //   console.log(result, user.password, password);
        //   if (!result)
        //   return res.status(400).json('Invalid password');
        const token = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        });
        res.cookie('auth-token', token);
        res.header('auth-token', token).json(user);
        // })
    }
    catch (error) {
        console.log(error);
    }
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.Users.findByPk(req.userId);
    if (!user)
        return res.status(404).json('No user found');
    return res.json(user);
});
exports.profile = profile;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, gender, phonenumber, password } = req.body;
    try {
        // bcrypt.hash(password, 10, async (err, hash) => {
        const udatedInfo = yield users_1.Users.update({
            name, lastname, email, gender, phonenumber, password
        }, {
            where: {
                id: req.userId
            }
        });
        return res.json(`User ${name} updated successfully`);
        // })
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});
exports.updateUser = updateUser;
const updateImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    const { path } = req.file;
    try {
        const result = yield cloudinary_1.default.uploader.upload(path);
        const udatedInfo = yield users_1.Users.update({
            picture: result.secure_url
        }, {
            where: {
                id: req.userId
            }
        });
        res.send(result.secure_url);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateImg = updateImg;
