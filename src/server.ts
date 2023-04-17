import express from "express";
import routes from "./routes";

(async () => {
  const app = express();

  app.use("/", express.static("./public", { dotfiles: "allow" }));

  app.use(routes);

  const port = 8282;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();
