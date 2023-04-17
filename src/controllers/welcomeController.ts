import { Request, Response } from "express";

class WelcomeController {

  public index(req: Request, res: Response) {
    res.send("Welcome to my application!");
  }

}

export default new WelcomeController();
