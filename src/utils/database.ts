import { Sequelize } from "sequelize";
import config from "src/config";
import { numberOrZero } from "./number";

const dbSequelize = new Sequelize({
  database: config?.database?.info?.name,
  username: config?.database?.user?.username,
  password: config?.database?.user?.password,
  host: config?.database?.info?.host,
  port: numberOrZero(config?.database?.info?.port),
  dialect: config?.database?.info?.dialect ?? "postgres",
  timezone: config?.database?.time?.timezone,
  pool: {
    max: config?.database?.pool?.max,
    min: config?.database?.pool?.min,
    acquire: config?.database?.pool?.acquire,
    idle: config?.database?.pool?.idle,
  }
});

export default dbSequelize;
