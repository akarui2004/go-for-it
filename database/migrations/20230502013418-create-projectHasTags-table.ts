import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.blueBright("Create projectHasTags table!"));
      await queryInterface.createTable("projectHasTags", {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "projects",
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
      console.log(clc.yellowBright("Drop projectHasTags table!"));
      await queryInterface.dropTable("projectHasTags", { transaction });
    }
  )
};
