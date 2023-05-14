import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create tag table!"));
      await queryInterface.createTable("tag", {
        ...ModelUtils.standardColumns(),

        deletedAt: {
          type: DataTypes.DATE,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        }
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop tag table!"));
      await queryInterface.dropTable("tag", { transaction });
    }
  )
};
