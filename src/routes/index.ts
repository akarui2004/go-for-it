import { Router } from "express";
import helmet from "helmet";
import { allowCors } from "src/middlewares";

const routes = Router();

routes.use(helmet(), allowCors());

export default routes;
