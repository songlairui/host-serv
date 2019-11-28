import { Query } from "./Query";
// import { Subscription } from "./Subscription";
import command from "./Mutation/command";
// import { User } from "./User";
// import { Post } from "./Post";

export default {
  Query,
  Mutation: {
    ...command
  }
  // Subscription,
  // User,
  // Post
};
