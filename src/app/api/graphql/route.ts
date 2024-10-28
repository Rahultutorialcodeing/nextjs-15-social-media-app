import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { User } from "@/serverFunction/User/connect";
const typeDefs = `#graphql
 ${User.types}

 type Query {
    hello: String
  }

  type Mutation{
    ${User.mutation}
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
    ...User.resolver.mutation,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    return { req: req };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
