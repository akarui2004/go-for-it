import { DataTypes, Model } from "sequelize";
import { StringUtils, dbSequelize } from "src/utils";
import Entity from "./Entity";

class Credential extends Model {
  public static readonly TABLE_NAME = "credential";
  public id!: string;

  public ownerId!: string;
  
  public userName!: string;
  public passWord!: string;

  public status!: string;

  //association
  public Entity?: Entity;
}

namespace Credential {
  export enum Status {
    Yes = "yes",
    No = "no"
  }
}

Credential.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("yes", "no"),
  }
}, {
  tableName: Credential.TABLE_NAME,
  paranoid: true,
  sequelize: dbSequelize,
});

Credential.addHook("beforeValidate", (model: Credential, options) => {
  if (!model.id)
    model.id = StringUtils.uuidv5(model.ownerId);
});

export default Credential;
