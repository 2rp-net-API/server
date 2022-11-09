import { Router, Request, Response } from "express";
import cliente from "./cliente";
import colaborador from "./colaborador";
import projeto from "./projeto";
import horaextra from "./horaextra";
import sobreaviso from "./sobreaviso";
import { colaborador as colaboradorController } from "../controllers";
import { authorization } from "../middlewares";
const routes = Router();

routes.use("/cliente", authorization, cliente);
routes.use("/colaborador", colaborador);
routes.use("/projeto", authorization, projeto);
routes.use("/horaextra", authorization, horaextra);
routes.use("/sobreaviso", authorization, sobreaviso);
routes.post("/login", colaboradorController.login);

//aceita qualquer método HTTP ou URL
//routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
