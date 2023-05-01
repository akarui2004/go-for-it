import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.blueBright("Create projects table!"));
      await queryInterface.createTable("projects", {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: "users"
            },
            key: "id"
          }
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        position: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
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
      console.log(clc.yellowBright("Drop projects table!"));
      await queryInterface.dropTable("projects", { transaction });
    }
  )
};
