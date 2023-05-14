import { DataTypes, Model } from "sequelize";
import { StringUtils, dbSequelize } from "src/utils";

class Person extends Model {
  public static readonly TABLE_NAME = "person";

  public id!: string;

  public email!: string;
  public firstName!: string;

  public middleName?: string;
  public lastName?: string;

  public phone?: string;
  public address?: string;
}

Person.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.CHAR(20),
  },
  address: {
    type: DataTypes.TEXT
  },
}, {
  modelName: Person.TABLE_NAME,
  paranoid: true,
  sequelize: dbSequelize
});

Person.addHook("beforeCreate", (model: Person, options) => {
  if (!model.id)
    model.id = StringUtils.uuidv1();
});

export default Person;
