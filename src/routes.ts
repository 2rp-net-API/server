import { Router } from "express";
import { HoraExtraController } from "./controllers/HoraExtraController";
import { SobreavisoController } from "./controllers/SobreavisoController";
import { UserController } from "./controllers/UserController";
import { authorization } from "./middlewares/auth";

const routes = Router();

routes.post("/signup", new UserController().create);
routes.post('/login', new UserController().login);
routes.post('/registro-hora-extra', new HoraExtraController().create)
routes.post('/registro-sobreaviso', new SobreavisoController().create)

routes.get('/:id', authorization, new UserController().getProfile)

export default routes;