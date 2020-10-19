import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from '@graphql/schema'
import rootValue from '@graphql/resolvers'

const app = express()

/**
 * example query:
 *   POST localhost:3000/graphql
 *   application/json { "query": "{ message data { name age } }" }
 */
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

app.listen(3000, () => {
  console.log('Server is running at port 3000.')
})
