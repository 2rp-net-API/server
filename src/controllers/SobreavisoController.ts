import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { sobreavisoRepository } from "../repositories/sobreavisoRepository";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class SobreavisoController {
  async create(req: Request, res: Response) {
    const { entrada, saida, isApproved, description } = req.body;

    const token: any = req.header("Authorization")?.split(" ")[1];
    const secret: any = process.env.SECRET_REFRESH_TOKEN;
    
    interface JwtPayload {
        id: string
    }
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const id = decoded.id

    const newSobreaviso = sobreavisoRepository.create({
      entrada,
      saida,
      isApproved: false,
      description,
      funcionario: id
    });

    await sobreavisoRepository.save(newSobreaviso)

    return res.status(201).json(newSobreaviso)
  }
}