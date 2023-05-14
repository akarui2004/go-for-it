import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create credential table!"));
      await queryInterface.createTable("credential", {
        ...ModelUtils.standardColumns(),

        deletedAt: {
          type: DataTypes.DATE,
        },
        ownerId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "entity",
            },
            key: "id",
          }
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passWord: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("no", "yes"),
          defaultValue: "no",
          allowNull: false,
        }
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop credential table!"));
      await queryInterface.dropTable("credential", { transaction });
    }
  )
};
