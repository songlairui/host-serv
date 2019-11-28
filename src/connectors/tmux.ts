import { openTmux as rawOpen } from "o-tmux/lib/utils";

import { spawn } from "child_process";
import { resolve } from "path";
import { vscFolder } from "../utils/paths";

export const openTmuxWithPanes = async function(
  name: string,
  force?: boolean,
  _n?: string
) {
  if (!name.startsWith("/")) {
    name = resolve(vscFolder, name);
  }
  try {
    await rawOpen(name, force, _n);
  } catch (error) {
    return false;
  }
  // TODO tmux new 与 osascript 分离
  await new Promise(r => setTimeout(r, 400));
  return true;
};

export const cache: {
  sessions: string[];
  p: Promise<string[]> | null;
} = {
  sessions: [],
  p: null
};

export const listTmuxSession = async function(noCache = false) {
  if (!cache.sessions.length) {
    noCache = true;
  }
  if (!noCache) {
    return cache.sessions;
  }
  if (!cache.p) {
    const ls = spawn("tmux", ["list-session", "-F", "#{session_name}"]);
    cache.p = new Promise<string[]>((r, j) => {
      let chunks = "";
      let error = "";
      ls.stdout.on("data", data => {
        chunks += `${data}`;
      });

      ls.stderr.on("data", data => {
        error += `${data}`;
      });

      ls.on("close", code => {
        if (code === 0) {
          r(chunks.trim().split(/\n+/));
        } else {
          console.info(error);
          r([]);
        }
      });
    });
  }

  const result = await cache.p;
  cache.sessions = result;
  cache.p = null;
  return result;
};

export const killTmuxSession = async function(sessionName) {
  const ls = spawn("tmux", ["kill-session", "-t", sessionName]);
  return new Promise<[string, string, number]>((r, j) => {
    let chunks = "";
    let error = "";
    ls.stdout.on("data", data => {
      chunks += `${data}`;
    });

    ls.stderr.on("data", data => {
      error += `${data}`;
    });

    ls.on("close", code => {
      r([error, chunks, code]);
    });
  });
};
