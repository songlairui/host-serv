import { openTmuxWithPanes, killTmuxSession } from "../../connectors/tmux";

export default {
  async openTmux(
    parent,
    {
      name,
      force,
      new: _new
    }: { name: string; force?: boolean; new?: boolean },
    info
  ) {
    return {
      success: await openTmuxWithPanes(name, force, _new)
    };
  },
  async killTmux(parent, { name }: { name: string }, info) {
    const [err, result, code] = await killTmuxSession(name);
    console.info("kill session", code, result, err);
    return {
      success: !err
    };
  }
};
