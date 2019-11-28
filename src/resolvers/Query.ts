import { Context } from "../interface";
import * as workspace from "../connectors/workspace";
import { listTmuxSession } from "../connectors/tmux";

export const Query = {
  workspaces(parent, args, ctx: Context) {
    return workspace.list();
  },

  workspace(parent, { id }, ctx: Context) {
    return workspace.detail(id);
  },

  async current(parent, { force }, ctx: Context) {
    return {
      sessions: await listTmuxSession(force)
    };
  }
};
