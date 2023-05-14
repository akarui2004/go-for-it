import { DataTypes } from "sequelize";

class Model {
  public standardColumns() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }
  }
}

const ModelUtils = new Model();

export default ModelUtils;
