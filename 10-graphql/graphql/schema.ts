import { buildSchema } from 'graphql'

export default buildSchema(`#graphql
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    user: UserQuery
  }

  type Mutation {
    user: UserMutation
  }

  type UserQuery {
    list: [User!]!
  }

  type UserMutation {
    create(email: String!, password: String!): User!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    name: String
    status: String
    posts: [Post!]!
  }

  type Post {
    id: ID!
    creator: User!
    title: String!
    content: String
    imageURL: String
  }
`)
