import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
      console.log(clc.blueBright("Create task table!"));
      await queryInterface.createTable("task", {
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
            key: "id",
          },
        },
        projectId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "project",
            },
            key: "id",
          },
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT("long"),
        },
        priority: {
          type: DataTypes.SMALLINT,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.ENUM("backlog", "open", "inprogress", "completed", "archived"),
        },
        dueDate: {
          type: DataTypes.DATE,
        },
        estimate: {
          type: DataTypes.INTEGER,
        },
        startDate: {
          type: DataTypes.DATE,
        },
        endDate: {
          type: DataTypes.DATE,
        },
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
      console.log(clc.yellowBright("Drop task table!"));
      await queryInterface.dropTable("task", { transaction });
    }
  )
};
