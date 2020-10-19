import { buildSchema } from 'graphql'

export default buildSchema(`#graphql
  schema {
    query: Query
  }

  type Query {
    message: String
    data: Data
  }

  type Data {
    name: String
    age: Int
  }
`)
