import { Sequelize } from "sequelize";
import config from "src/config";
import { numberOrZero } from "./number";

const sequelize = new Sequelize({
  database: config?.database?.info?.name,
  username: config?.database?.user?.username,
  password: config?.database?.user?.password,
  host: config?.database?.info?.host,
  port: numberOrZero(config?.database?.info?.port),
  dialect: "mysql",
  timezone: config?.database?.time?.timezone,
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true
  }
});

export default sequelize;
