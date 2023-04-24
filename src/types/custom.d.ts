export interface SimpleMap<V = string> {
  [index: string]: T
};

export interface DBConfItem {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  timezone: string;
  dialectOptions?: {
    supportBigNumbers?: boolean;
    bigNumberStrings?: boolean;
  };
}
