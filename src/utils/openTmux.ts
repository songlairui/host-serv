import { openTmux as rawOpen } from "o-tmux/lib/utils";

import { resolve } from "path";

import { vscFolder } from "./paths";

export const openTmuxWithPanes = function(
  name: string,
  force?: boolean,
  _new?: boolean
) {
  if (!name.startsWith("/")) {
    name = resolve(vscFolder, name);
  }
  try {
    rawOpen(name, force, _new);
  } catch (error) {
    return false;
  }
  return true;
};
