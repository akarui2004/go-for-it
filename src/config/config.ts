import fs from "fs";
import path from "path";

export const ROOT = path.resolve(__dirname);

export const SRC_PATH = path.resolve(__dirname, "./src");

export const TOML_PATH = path.resolve(__dirname, "./toml");

export const config = () => {
  const readTomlFile = fs.readFileSync("./toml/base.toml", "utf-8");
  console.log(readTomlFile.toString());
}
