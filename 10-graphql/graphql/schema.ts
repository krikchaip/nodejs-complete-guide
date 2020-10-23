import { buildSchema } from 'graphql'

export default buildSchema(`#graphql
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
  }

  type Mutation {
  }
`)
