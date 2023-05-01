import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.blueBright("Create tasks table!"));
      await queryInterface.createTable("tasks", {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: "projects",
            },
            key: "id",
          }
        },
        priorityId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: "priorities",
            },
            key: "id",
          },
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT("long"),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("open", "in-progress", "completed", "closed", "archived"),
          allowNull: true,
          defaultValue: "open",
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: true,
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
      console.log(clc.yellowBright("Drop tasks table!"));
      await queryInterface.dropTable("tasks", { transaction });
    }
  )
};
