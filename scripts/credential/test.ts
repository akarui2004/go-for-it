require("../../src/init");

import { Transaction } from "sequelize";
import { Person } from "src/models";
import { ModelUtils, StringUtils } from "src/utils";

(async () => {
  await ModelUtils.runTransaction(async (transaction: Transaction) => {
    return await Person.create({
      email: "minh2@example.com",
      firstName: "Minh2",
      phone: "098766512",
      address: "N/A",
    }, { transaction });
  });
})();
