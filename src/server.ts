require("./init");

import express from "express";
import config from "./config";
import { DEFAULTS } from "./constants";
import routes from "./routes";
import logger from "./utils/logger";

(async () => {
  const app = express();

  app.use("/", express.static("./public", { dotfiles: "allow" }));

  app.use(routes);

  const port = config?.env?.port ?? DEFAULTS.PORT;

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    logger.info(`Server is running at http://localhost`, { port });
  });
})();
