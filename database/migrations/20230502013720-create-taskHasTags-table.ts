import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.blueBright("Create taskHasTags table!"));
      await queryInterface.createTable("taskHasTags", {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        taskId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "tasks",
            key: "id",
          },
        },
        tagId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "tags",
            key: "id",
          },
        }
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.yellowBright("Drop taskHasTags table!"));
      await queryInterface.dropTable("taskHasTags", { transaction });
    }
  )
};
