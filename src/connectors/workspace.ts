import { readdir, readFile } from "fs-extra";
import { resolve, parse } from "path";
import { Workspace } from "../interface";
import { vscFolder } from "../utils/paths";

const getWorkspaceDetail = async function(shortname: string) {
  const { dir, name } = parse(shortname);
  const targetFile = resolve(vscFolder, dir, `${name}.code-workspace`);
  const { folders, settings } = JSON.parse(
    (await readFile(targetFile)).toString()
  );
  return {
    id: name,
    folders,
    settings
  } as Workspace;
};

export const list = async function() {
  const files = (await readdir(vscFolder)).filter(item =>
    item.endsWith(".code-workspace")
  );

  return Promise.all(
    files.map(async file => ({
      id: file.slice(0, file.length - ".code-workspace".length),
      ...(await getWorkspaceDetail(file))
    }))
  );
};

export const detail = async function(shortname: string) {
  return getWorkspaceDetail(shortname);
};
