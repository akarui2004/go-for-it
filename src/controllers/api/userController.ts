import { Request, Response } from "express";

class UserController {

  public list(req: Request, res: Response) {
    res.send("User Controller here!");
  }
}

export default new UserController();
