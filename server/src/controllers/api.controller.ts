import axios from "axios";
import { Request, Response } from "express";

const apiLink = 'https://api.deezer.com/'

export const searchMusic = async (req: Request, res: Response) => {
  const { q } = req.query
  try {
    const { data } = await axios.get(`${apiLink}search?q=${q}`)
    const track = data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      duration: item.duration,
      preview: item.preview,
      artist: item.artist.name,
      album_cover: item.album.cover_medium
    }))
    
    res.send(track);
  } catch (error) {
    console.log(error);
  }
};

export const artistAlbum = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${apiLink}/artist/647650/albums?limit=10`)
    const albums = data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      cover: item.cover_medium,
    }));
    res.send(albums);
  } catch (error) {
    console.log(error);
  }
}

//