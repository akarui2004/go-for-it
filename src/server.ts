require("./init");

import express from "express";
import config from "./config";
import { DEFAULTS } from "./constants";
import routes from "./routes";
import { dbSequelize, logger } from "./utils";

(async () => {
  const app = express();

  app.use("/", express.static("./public", { dotfiles: "allow" }));

  app.use(routes);

  const port = config?.env?.port ?? DEFAULTS.PORT;

  dbSequelize
  .sync()
  .then(() => {
    console.log("Databae connection established successfully.");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      logger.info(`Server is running at http://localhost`, { port });
    });
  })
  .catch((err) => {
    console.log("Unable to connect to database.");
    logger.error("Unable to connect to database:", err);
  })
})();
