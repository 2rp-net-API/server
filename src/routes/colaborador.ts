import { Router } from "express";
import { colaborador } from "../controllers";
import { authAdmin, authGestor, authorization } from "../middlewares";

const routes = Router();

routes.post("/create", colaborador.create);
routes.put("/update", authorization, authAdmin, colaborador.update);
routes.put("/password",authorization, colaborador.updatePassword);
routes.delete("/delete",authorization, authAdmin, colaborador.delete);
routes.get("/:perfil",authorization, authGestor, colaborador.list);

export default routes;
