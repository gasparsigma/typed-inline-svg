import { join } from "path";
import chalk from "chalk";
import _glob from "glob";
import { promisify } from "util";
import { isThere, createDefinitionsFile } from "./utils";

const glob = promisify(_glob);

export const run = async (
  basePath: string,
  log: (...params: any[]) => void
) => {
  log(`Running on ${basePath}`);
  const filesPattern = join(basePath, "**/*.svg");

  const files = await glob(filesPattern);

  if (!files.length) {
    log(
      `${chalk.black.bgYellow(
        "WARN"
      )} Matched 0 file **/*.svg at ${chalk.yellow(basePath)}`
    );
    return;
  }

  const createDefinition = async (filePath: string): Promise<void> => {
    const newFilePath = filePath + ".d.ts";
    if (await isThere(newFilePath)) {
      log(`${chalk.yellow("[Skip]")} ${newFilePath}`);
    } else {
      if (await createDefinitionsFile(newFilePath)) {
        log(`${chalk.green("[Write]")} ${newFilePath}`);
      } else {
        log(`${chalk.red("[Fail]")} ${newFilePath}`);
      }
    }
  };

  const promises = files.map(createDefinition);

  await Promise.all(promises);
};
