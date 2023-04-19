import fs from "fs";
import { ErrorCodes, NODE_ENV } from "src/constants";
import Toml from "toml";

export interface Configurations {
  __configure: (folder: string) => void;
  [index: string]: any;
}

const LOAD_SEQUENCE = [
  "base",
  "local"
];

const loadConfig = (fileName: string) => {
  const configPath = `${config.__configFolder}/${fileName}.toml`;
  try {
    const toml = Toml.parse(fs.readFileSync(configPath, "utf8"));
    if (toml.__configure)
      throw new Error(ErrorCodes.Toml.ConfigureKeyword);
    if (toml.__configFolder)
      throw new Error(ErrorCodes.Toml.ConfigureFolderKeyword);
    return toml;
  } catch (e) {
  }
}

const configure = (configFolder: string) => {
  config.__configFolder = configFolder;

  const configEnvs = [...LOAD_SEQUENCE, NODE_ENV];
  for (const env of configEnvs) {
    const envConfig = loadConfig(env);
    if (envConfig)
      Object.assign(config, envConfig);
  }
}

const config: Configurations = { __configure: configure };

export default config;
