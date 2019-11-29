import { openTmux as rawOpen } from "o-tmux/lib/utils";

import { spawn } from "child_process";
import { resolve, parse } from "path";
import { vscFolder } from "../utils/paths";

export const openTmuxWithPanes = async function(
  name: string,
  force?: boolean,
  _new?: boolean
) {
  if (!name.startsWith("/")) {
    name = resolve(vscFolder, name);
  }
  try {
    let customName: string;
    if (_new) {
      const { name: sessionName } = parse(name);
      customName = String(await genNextSessionId(sessionName));
      console.info("custom session name", `${sessionName}__${customName}`);
    }
    await rawOpen(name, force, customName);
  } catch (error) {
    return false;
  }
  return true;
};

export const tmuxStateCache: {
  sessions: string[];
  p: Promise<string[]> | null;
} = {
  sessions: [],
  p: null
};

export const genNextSessionId = async function(
  sessionName: string
): Promise<number> {
  const lastSessionName = (await listTmuxSession())
    .filter(item => item.startsWith(`${sessionName}__`))
    .pop();

  if (!lastSessionName) {
    return 1;
  }
  return 1 + (parseInt(lastSessionName.split(/__+/)[1]) || 1);
};

export const listTmuxSession = async function(noCache = false) {
  if (!tmuxStateCache.sessions.length) {
    noCache = true;
  }
  if (!noCache) {
    return tmuxStateCache.sessions;
  }
  if (!tmuxStateCache.p) {
    const ls = spawn("tmux", ["list-session", "-F", "#{session_name}"]);
    tmuxStateCache.p = new Promise<string[]>((r, j) => {
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

  const result = await tmuxStateCache.p;
  tmuxStateCache.sessions = result;
  tmuxStateCache.p = null;
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
