import { Query } from "./Query";
import common from "./Mutation/common";
import tmux from "./Mutation/tmux";
import { listTmuxSession } from "../connectors/tmux";

export default {
  CmdResult: {
    state: async (info, args) => {
      const sessions = await listTmuxSession(info.success);
      return {
        sessions
      };
    }
  },
  Query,
  Mutation: {
    ...common,
    ...tmux
  }
  // Subscription,
};
