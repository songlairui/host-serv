import { GraphQLServer } from "graphql-yoga";

import "./utils/_init";

import resolvers from "./resolvers";
import db from "./utils/db";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({
    ...request,
    db
  })
});
server.start(
  {
    endpoint: "/graphql",
    subscriptions: "/graphql",
    port: 4004
  },
  () => console.log(`Server is running on http://localhost:4004`)
);
