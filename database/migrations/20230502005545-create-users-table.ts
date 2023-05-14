import clc from "cli-color";
import { DataTypes, QueryInterface } from 'sequelize';
import { ModelUtils } from "src/utils";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.blueBright("Create users table!"));
      await queryInterface.createTable("users", {
        ...ModelUtils.standardColumns(),
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cellPhone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      }, { transaction });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      console.log(clc.yellowBright("Drop users table!"));
      await queryInterface.dropTable("users", { transaction });
    }
  )
};
