import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create entity table!"));
      await queryInterface.createTable("entity", {
        ...ModelUtils.standardColumns(),

        deletedAt: {
          type: DataTypes.DATE,
        },
        ownerId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: "person"
            },
            key: "id"
          }
        },
        ownerType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop entity table!"));
      await queryInterface.dropTable("entity", { transaction });
    }
  )
};
