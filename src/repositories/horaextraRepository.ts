import { AppDataSource } from "../data-source";
import { HoraExtra } from "../entities/HoraExtra";

export const horaextraRepository = AppDataSource.getRepository(HoraExtra)