import { AppDataSource } from "../data-source";
import { Funcionario } from "../entities/Funcionario";

export const funcionarioRepository = AppDataSource.getRepository(Funcionario)