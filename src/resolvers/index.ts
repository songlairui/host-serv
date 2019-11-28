import { Query } from "./Query";
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
    ...tmux
  }
  // Subscription,
};
