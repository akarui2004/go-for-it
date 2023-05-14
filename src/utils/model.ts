import { DataTypes } from "sequelize";

class Model {
  standardColumns() {
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
