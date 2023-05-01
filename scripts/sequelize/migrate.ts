import { format } from "date-fns";
import fs from "fs";
import path from "path";
import clc from "cli-color";

(async () => {
  const argvs: string[] = process.argv;
  if (argvs.length <= 2) {
    console.log(clc.redBright("Expected at least one arguments!"));
    process.exit(128);
  }

  const nameIndex: number = argvs.indexOf("--name");
  if (nameIndex <= -1) {
    console.log(clc.redBright("The --name is expected."));
    process.exit(128);
  }

  let migrationName: string = argvs[nameIndex + 1];
  const currentDateTime = format(new Date(), "yyyyMMddHHmmss");

  try {
    const migrationContent = await fs.readFileSync(path.resolve("scripts/sequelize/skeleton/migration.txt"), "utf-8");
    const migrationFilePath = path.resolve("database/migrations", `${currentDateTime}-${migrationName}.ts`);

    await fs.writeFileSync(migrationFilePath, migrationContent, "utf-8");

    console.log(clc.blue("Migration file created successfully!"));
    console.log(clc.green(migrationFilePath));
  } catch (error: any) {
    console.log(clc.red("Migration file failed to generate!"));
    console.log(clc.red([error?.message, migrationName]));
  }
})().catch(console.error).finally(() => process.exit(0));
