import { Router } from "express";
import { UserController } from "src/controllers";

const router = Router();

router.get("/list", UserController.list);

export default router;
