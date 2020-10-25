import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import '@model/relations'

import sequelize from '@config/sequelize'
import schema from '@graphql/schema'
import rootValue from '@graphql/resolver'

const app = express()

/**
 * example query:
 *   POST localhost:3000/graphql
 *   application/json { "query": "{ healthcheck }" }
 */
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

app.listen(3000, async () => {
  await sequelize.sync({ force: true })
  console.log('Server is running at port 3000.')
})
