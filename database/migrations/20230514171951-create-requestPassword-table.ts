import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create requestPassword table!"));
      await queryInterface.createTable("requestPassword", {
        ...ModelUtils.standardColumns(),

        deletedAt: {
          type: DataTypes.DATE,
        },
        ownerId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "entity"
            },
            key: "id"
          },
          allowNull: false,
        },
        alreadyReset: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        expiredAt: {
          type: DataTypes.DATE,
        }
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop requestPassword table!"));
      await queryInterface.dropTable("requestPassword", { transaction });
    }
  )
};
