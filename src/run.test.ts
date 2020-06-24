import { promisify } from "util";
import _rimraf from "rimraf";
import { mkdirSync } from "fs";
import { writeFileSync } from "fs";
import { join } from "path";
import { isThere } from "./utils";

import { run } from "./run";

const rimraf = promisify(_rimraf);

const testsDir = "__temp_tests_dir__";

describe("run", () => {
  beforeEach(async () => {
    await rimraf(testsDir);
    mkdirSync(testsDir);
  });

  afterAll(async () => {
    await rimraf(testsDir);
  });

  it("creates file", async () => {
    writeFileSync(join(testsDir, "test.svg"), "", "utf8");
    await run(testsDir, () => {});
    const fileIsThere = await isThere(join(testsDir, "test.svg.d.ts"));
    expect(fileIsThere).toBe(true);
  });

  it("skips existing files", async () => {
    writeFileSync(join(testsDir, "test.svg"), "", "utf8");
    writeFileSync(join(testsDir, "test.svg.d.ts"), "", "utf8");
    const logger = (param: string) => {
      if (param.substr(0, 7) !== "Running") {
        expect(param).toMatch(/\[Skip\].*test\.svg\.d\.ts/);
      }
    };
    await run(testsDir, logger);
  });
});
