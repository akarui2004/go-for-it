require("../../src/init");

import fs from "fs";
import path from "path";
import config from "src/config";
import { NODE_ENV } from "src/constants";
import { DBConfItem, SimpleMap } from "src/types";

(async () => {
  try {
    const dbConfFile: string = path.resolve("config", "sql.js");
    let dbConfJson: SimpleMap<DBConfItem> = {};

    const { name, port, host, dialect } = config?.database?.info;
    const { username, password } = config?.database?.user;
    const { timezone } = config?.database?.time;
    const { ...pool } = config?.database?.pool;

    dbConfJson[NODE_ENV] = {
      username, password,
      host, port, dialect,
      database: name,
      timezone,
      pool: pool
    };

    //Generate json data with 2 space and tab indent
    const stream = fs.createWriteStream(dbConfFile, "utf-8");
    stream.write("// Do not modify this file directly, update config/toml instead.\n\n");
    stream.write("module.exports = " + JSON.stringify(dbConfJson, null, 2));
    stream.end();

    await new Promise((resolve) => stream.on("finish", resolve));
    console.log("Sequelize CLI configuration generate successfully.");
  } catch (error: any) {
    console.log(`Error message: ${error?.message}`);
    console.log("Sequelize CLI configuration generate failed.");
  }
})().catch(console.error).finally(() => process.exit(0));
