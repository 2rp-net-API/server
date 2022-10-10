import { AppDataSource } from "../data-source";
import { Sobreaviso } from "../entities/Sobreaviso";

export const sobreavisoRepository = AppDataSource.getRepository(Sobreaviso)