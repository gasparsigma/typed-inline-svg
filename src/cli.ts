#!/usr/bin/env node

import * as yargs from "yargs";
import { run } from "./run";
import chalk from "chalk";

const { version: packageVersion } = require("../package.json");

const yarg = yargs
  .usage(
    "Create .svg.d.ts from *.svg files.\nUsage: $0 <search directory> [options]"
  )
  .example("npx typed-inline-svg src", "")
  .detectLocale(false)
  .describe("s", 'Silent output. Do not show "files written" messages')
  .boolean("s")
  .help("h")
  .boolean("v")
  .version(packageVersion);

async function main(): Promise<void> {
  const argv = yarg.argv;
  const command = (yarg as any)["$0"];

  let silent = argv.s;

  const consoleLog = (...args: any[]) => {
    console.log(command, ...args);
  };

  let searchDir: string;
  if (argv._ && argv._[0]) {
    searchDir = argv._[0];
  } else {
    consoleLog(
      `${chalk.red("ERR!")} ${chalk.yellow("<search directory>")} required`
    );
    consoleLog(
      `${chalk.red("ERR!")} Example: \`${chalk.yellow(
        "npx typed-inline-svg src"
      )}\``
    );
    return;
  }

  await run(searchDir, silent ? () => {} : consoleLog);
}

main();
