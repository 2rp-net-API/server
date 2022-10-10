import { Funcionario } from "../entities/Funcionario";
import { HoraExtra } from "../entities/HoraExtra";
import { Sobreaviso } from "../entities/Sobreaviso";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<Funcionario>;
      horaExtra: Partial<HoraExtra>;
      sobreaviso: Partial<Sobreaviso>;
    }
  }
}
