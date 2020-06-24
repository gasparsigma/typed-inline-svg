import { writeFileSync, access as _access, constants } from "fs";
import _glob from "glob";
import { promisify } from "util";

const access = promisify(_access);

const genericDefinitionsFile = `declare const svgFactory: React.SVGFactory;\r\nexport = svgFactory;\r\n`;

export const isThere = async (path: string) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const createDefinitionsFile = async (newFilePath: string) => {
  try {
    writeFileSync(newFilePath, genericDefinitionsFile, "utf8");
    return true;
  } catch (err) {
    return false;
  }
};
