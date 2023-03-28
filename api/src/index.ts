import apollo, { gql } from "@elysiajs/apollo";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(
    apollo({
      typeDefs: gql`
        type Book {
          title: String
          author: String
        }

        type Query {
          books: [Book]
        }
      `,
      resolvers: {
        Query: {
          books: () => {
            return [
              {
                title: "Elysia",
                author: "saltyAom",
              },
            ];
          },
        },
      },
    })
  )
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
