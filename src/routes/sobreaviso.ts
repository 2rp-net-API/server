import { Router } from "express";
import { sobreaviso } from "../controllers";
import { authAdmin, authorization } from "../middlewares";
const routes = Router();

routes.post("/create", authorization, sobreaviso.create);
routes.put("/update", authorization, sobreaviso.update);
routes.put("/approve", sobreaviso.approve);
routes.delete("/delete", authorization, sobreaviso.delete);
routes.get("/list", authorization, sobreaviso.list);

export default routes;