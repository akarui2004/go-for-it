require("../../src/init");

import fs from "fs";
import path from "path";
import config from "src/config";
import { NODE_ENV } from "src/constants";
import { DBConfItem, SimpleMap } from "src/types";

const genConfig = async () => {
  try {
    const dbConfFile: string = path.resolve("config", "database.json");
    let dbConfJson: SimpleMap<DBConfItem> = {};

    const { name, port, host, dialect } = config?.database?.info;
    const { username, password } = config?.database?.user;
    const { timezone } = config?.database?.time;

    dbConfJson[NODE_ENV] = {
      username, password,
      host, port, dialect,
      database: name,
      timezone,
      dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
      },
    };

    const fileExists: boolean = await fs.existsSync(dbConfFile);
    if (fileExists) {
      //Write empty file to write a new configuration
      await fs.writeFileSync(dbConfFile, "", "utf-8");
    }

    //Generate json data with 2 space and tab indent
    await fs.writeFileSync(dbConfFile, JSON.stringify(dbConfJson, null, 2), "utf-8");
    console.log("Sequelize CLI configuration generate successfully.");
  } catch (error: any) {
    console.log(`Error message: ${error?.message}`);
    console.log("Sequelize CLI configuration generate failed.");
  }
}

genConfig();
