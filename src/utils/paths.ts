import { homedir } from "os";
import { resolve } from "path";
import { pathExists, mkdirp } from "fs-extra";

export const vscFolder = resolve(homedir(), "_vsc-workspaces");

export async function checkPath(targetFolder) {
  if (!(await pathExists(targetFolder))) {
    console.info(`创建文件夹: ${targetFolder}`);
    await mkdirp(targetFolder);
  }
}

