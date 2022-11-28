import { Router } from "express";
import { horaextra } from "../controllers";
import { authAdmin, authorization } from "../middlewares";
const routes = Router();

routes.post("/create", authorization, horaextra.createhoraextra);
routes.put("/update", authorization, horaextra.update);
routes.put("/approve", horaextra.approve);
routes.delete("/delete", authorization, horaextra.delete);
routes.get("/list", authorization, horaextra.list);

export default routes;
