import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";
import { funcionarioRepository } from "../repositories/funcionarioRepository";
import * as dotenv from "dotenv";
dotenv.config();

type JwtPayLoad = {
  id: number;
};

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayLoad;

  const user = await funcionarioRepository.findOneBy({ id });
  if (!user) {
    throw new UnauthorizedError("Não autorizado");
  }

  next();
};
