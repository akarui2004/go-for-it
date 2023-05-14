import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create project table!"));
      await queryInterface.createTable("project", {
        ...ModelUtils.standardColumns(),

        deletedAt: {
          type: DataTypes.DATE,
        },
        entityId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "entity",
            },
            key: "id"
          },
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        status: {
          type: DataTypes.ENUM("active", "deactive", "draft", "archived"),
          defaultValue: "draft",
        },
        publishAt: {
          type: DataTypes.DATE,
        },
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop project table!"));
      await queryInterface.dropTable("project", { transaction });
    }
  )
};
