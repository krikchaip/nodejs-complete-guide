import { buildSchema } from 'graphql'

export default buildSchema(`#graphql
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    user: UserQuery!
  }

  type Mutation {
    user: UserMutation!
  }

  type UserQuery {
    list(token: String!): [User!]!
    login(email: String!, password: String!): UserLogin!
  }

  type UserMutation {
    create(email: String!, password: String!, role: Role = USER): User!
  }

  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
    name: String
    status: String
    posts: [Post!]!
  }

  type UserLogin {
    token: String!
    data: User!
  }

  type Post {
    id: ID!
    creator: User!
    title: String!
    content: String
    imageURL: String
  }
`)
