import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create taskHasTag table!"));
      await queryInterface.createTable("taskHasTag", {
        taskId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "task",
            },
            key: "id",
          },
        },
        tagId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "tag",
            },
            key: "id"
          },
        },
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop taskHasTag table!"));
      await queryInterface.dropTable("taskHasTag", { transaction });
    }
  )
};
