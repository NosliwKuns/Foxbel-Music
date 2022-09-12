"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signIn = exports.signUp = void 0;
const signUp = (req, res) => {
    console.log(req.body);
    res.send('singup');
};
exports.signUp = signUp;
const signIn = (req, res) => {
    res.send('singin');
};
exports.signIn = signIn;
const profile = (req, res) => {
    res.send('profile');
};
exports.profile = profile;
