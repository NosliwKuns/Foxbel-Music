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
exports.artistAlbum = exports.searchMusic = void 0;
const axios_1 = __importDefault(require("axios"));
const apiLink = 'https://api.deezer.com/';
const searchMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    try {
        const { data } = yield axios_1.default.get(`${apiLink}search?q=${q}`);
        const track = data.data.map((item) => ({
            id: item.id,
            title: item.title,
            duration: item.duration,
            preview: item.preview,
            artist: item.artist.name,
            album_cover: item.album.cover_medium
        }));
        res.send(track);
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchMusic = searchMusic;
const artistAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`${apiLink}/artist/647650/albums?limit=10`);
        const albums = data.data.map((item) => ({
            id: item.id,
            title: item.title,
            cover: item.cover_medium,
        }));
        res.send(albums);
    }
    catch (error) {
        console.log(error);
    }
});
exports.artistAlbum = artistAlbum;
//
