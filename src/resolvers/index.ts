import { Query } from "./Query";
// import { Subscription } from "./Subscription";
import tmux from "./Mutation/tmux";
// import { User } from "./User";
// import { Post } from "./Post";

export default {
  Query,
  Mutation: {
    ...tmux
  }
  // Subscription,
  // User,
  // Post
};
