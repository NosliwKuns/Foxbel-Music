import { Router } from 'express';
const router = Router();

import { TokenValidation } from '../libs/verifyToken';
import { fileUpload } from '../controllers/index.controller';

import { getUsers, createUser, updateUser, signin, profile, updateImg } from '../controllers/index.controller'
import { artistAlbum, searchMusic } from '../controllers/api.controller';

//user routes
router.get('/api/users', getUsers);
router.post('/api/users', fileUpload, createUser);
router.post('/api/signin', signin);

//protected routes
router.get('/api/profile',TokenValidation, profile);
router.put('/api/profile/update', TokenValidation, updateUser);
router.put('/api/profile/picture', TokenValidation, fileUpload, updateImg);

//api routes
router.get('/api/music/search', searchMusic);
router.get('/api/artist/album', artistAlbum);


export default router;