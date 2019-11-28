import { Context } from "../interface";
import * as workspace from "../connectors/workspace";

export const Query = {
  workspaces(parent, args, ctx: Context) {
    return workspace.list();
  },

  workspace(parent, { id }, ctx: Context) {
    return workspace.detail(id);
  }
};
