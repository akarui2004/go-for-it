import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.blueBright("Create tags table!"));
      await queryInterface.createTable("tags", {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: "projects",
            },
            key: "id",
          }
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.yellowBright("Drop tags table!"));
      await queryInterface.dropTable("tags", { transaction });
    }
  )
};
