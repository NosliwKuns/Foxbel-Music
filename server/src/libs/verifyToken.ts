import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if(!token) return res.status(401).json('Accsess denied');

  const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
  req.userId = payload._id

  console.log(payload)

  next();
}