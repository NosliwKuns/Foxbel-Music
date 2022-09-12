import { Request, Response } from "express";
import { pool } from "../database";


import jwt from "jsonwebtoken";
import { Users } from './../models/users';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import cloudinary from "../utils/cloudinary";

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../../images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-space-' + file.originalname)
  }
})

export const fileUpload = multer({
  storage: diskstorage,
}).single('image')

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await Users.findAll();
  return res
    .status(200)
    .json(users);
};

interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  gender: string;
  phonenumber: string;
  password: string;
  picture: string;
}

export const createUser = async (
  req: Request, 
  res: Response
): Promise<void> => {
  const { name, lastname, email, gender, phonenumber, password, picture} =
    req.body;
  console.log(req.file)

  const path: any = req.file?.path;
  const result : any = req.file && await cloudinary.uploader.upload(path);
  // bcrypt.hash(password, 10, async (err, hash) => {

    const user: any = {
      name,
      email,
      gender,
      lastname,
      phonenumber,
      password, 
      picture: result ? result.secure_url : null
    }

   const usera = await Users.create(user);
   
   // token
   const token: string = jwt.sign({_id: usera.id}, process.env.TOKEN_SECRET || 'tokentest', {
    expiresIn: 60 * 60 * 24
  })
    res.cookie('auth-token', token)
    res.header('auth-token', token).json(usera);
   
  // })
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: { email, password }
    });
  
    if (!user) 
    return res.status(400).json('Email or password is wrong');
    
    // bcrypt.compare(password, user.password, (err, result) => {
    //   console.log(result, user.password, password);
    //   if (!result)
    //   return res.status(400).json('Invalid password');
  
      const token: string = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
      })
      res.cookie('auth-token', token)
      res.header('auth-token', token).json(user);
    // })
  } catch (error) {
    console.log(error);
  }

};

export const profile = async (req: Request, res: Response) => {
  const user = await Users.findByPk(req.userId);
  if (!user) return res.status(404).json('No user found');
  return res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  const { name, lastname, email, gender, phonenumber, password } = req.body;

  try {
    // bcrypt.hash(password, 10, async (err, hash) => {

      const udatedInfo = await Users.update({
        name, lastname, email, gender, phonenumber, password
      }, {
        where: {
          id: req.userId
        }
      })
      return res.json(`User ${name} updated successfully`);  
    // })
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }

};

export const updateImg = async (req: Request, res: Response) => {
  console.log(req.file)
  const { path }: any = req.file;
  try {
    const result = await cloudinary.uploader.upload(path);
    const udatedInfo = await Users.update({
      picture: result.secure_url
    }, {
      where: {
        id: req.userId
      }
    });
    
    res.send(result.secure_url);
  } catch (error) {
    console.log(error)
  }
};
