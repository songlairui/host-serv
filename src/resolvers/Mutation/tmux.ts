import {
  openTmuxWithPanes,
  listTmuxSession,
  killTmuxSession
} from "../../connectors/tmux";

export default {
  async openTmux(
    parent,
    { name, force, n }: { name: string; force?: boolean; n?: string },
    info
  ) {
    const success = await openTmuxWithPanes(name, force, n);
    return {
      success,
      state: {
        sessions: await listTmuxSession(true)
      }
    };
  },
  async killTmux(parent, { name }: { name: string }, info) {
    const [err, result, code] = await killTmuxSession(name);
    console.info("kill session", code, result, err);
    return {
      success: !err,
      state: {
        sessions: await listTmuxSession(true)
      }
    };
  }
};
