import { DataTypes, Transaction } from "sequelize";
import dbSequelize from "./database";

type TransactionFunction<T> = (transaction: Transaction) => Promise<T>;

class Model {
  public standardColumns() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }
  }

  public async runTransaction<T>(fn: TransactionFunction<T>) {
    const transaction = await dbSequelize.transaction();

    try {
      const result = await fn(transaction);

      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

const ModelUtils = new Model();

export default ModelUtils;
