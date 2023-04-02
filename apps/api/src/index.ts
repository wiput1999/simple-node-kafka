import gql from "graphql-tag"
import { v4 as uuid } from "uuid"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = gql`
  type Book {
    id: String
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  input CreateBook {
    title: String!
    author: String!
  }

  type Mutation {
    createBook(input: CreateBook!): Book!
  }
`

const resolvers = {
  Query: {
    books: () => {
      return [
        {
          id: "1",
          title: "Elysia",
          author: "saltyAom",
        },
      ]
    },
  },
  Mutation: {
    createBook: (_args: any, { input }: any, _ctx: any) => {
      return {
        id: uuid(),
        ...input,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
