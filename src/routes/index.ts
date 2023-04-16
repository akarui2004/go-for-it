import { Router } from "express";
import helmet from "helmet";
import { WelcomeController } from "src/controllers";
import { allowCors } from "src/middlewares";
import api from "./api";

const routes = Router();

routes.use(helmet(), allowCors());

routes.get("/", WelcomeController.index);

routes.use("/api", api);

export default routes;
