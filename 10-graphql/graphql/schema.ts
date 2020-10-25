import { buildSchema } from 'graphql'

export default buildSchema(`#graphql
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    healthcheck: String
    users: [User]
  }

  type Mutation {
    create: CreateMutation
  }

  type CreateMutation {
    user(email: String!, password: String!): User
  }

  type User {
    id: ID
    email: String
    password: String
    name: String
    status: String
    posts: [Post]
  }

  type Post {
    id: ID
    creator: User
    title: String
    content: String
    imageURL: String
  }
`)
