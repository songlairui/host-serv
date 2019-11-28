import { openTmux as rawOpen } from "o-tmux/lib/utils";

import { resolve } from "path";

import { vscFolder } from "./paths";

export const openTmuxWithPanes = function(name: string, force?: boolean) {
  if (!name.startsWith("/")) {
    name = resolve(vscFolder, name);
  }
  return rawOpen(name, force);
};
