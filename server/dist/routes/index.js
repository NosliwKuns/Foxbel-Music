"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const verifyToken_1 = require("../libs/verifyToken");
const index_controller_1 = require("../controllers/index.controller");
const index_controller_2 = require("../controllers/index.controller");
const api_controller_1 = require("../controllers/api.controller");
//user routes
router.get('/api/users', index_controller_2.getUsers);
router.post('/api/users', index_controller_1.fileUpload, index_controller_2.createUser);
router.post('/api/signin', index_controller_2.signin);
//protected routes
router.get('/api/profile', verifyToken_1.TokenValidation, index_controller_2.profile);
router.put('/api/profile/update', verifyToken_1.TokenValidation, index_controller_2.updateUser);
router.put('/api/profile/picture', verifyToken_1.TokenValidation, index_controller_1.fileUpload, index_controller_2.updateImg);
//api routes
router.get('/api/music/search', api_controller_1.searchMusic);
router.get('/api/artist/album', api_controller_1.artistAlbum);
exports.default = router;
