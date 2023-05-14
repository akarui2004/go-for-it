import { DataTypes, Model } from "sequelize";
import { StringUtils, dbSequelize } from "src/utils";

class Entity extends Model {
  public static readonly TABLE_NAME = "entity";

  public id!: string;

  public ownerId!: string;
  public ownerType!: string;
}

Entity.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ownerType: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: Entity.TABLE_NAME,
  paranoid: true,
  sequelize: dbSequelize
});

Entity.addHook("beforeCreate", (model: Entity, options) => {
  if (!model.id)
    model.id = StringUtils.uuidv5(model.ownerId, model.ownerType);
});

export default Entity;
