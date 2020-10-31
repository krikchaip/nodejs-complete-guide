import { Sequelize } from 'sequelize'

// TODO custom config options based on NODE_ENV
// TODO highlight SQL statements
const sequelize = new Sequelize({
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: '10-graphql',
  dialect: 'postgres',
  timezone: '+07:00',
  typeValidation: true,
  define: { freezeTableName: true, timestamps: false },
  logging: sql =>
    console.log(
      `\x1b[1m${new Date().toUTCString()}\x1b[0m\n\x1b[36m${sql}\x1b[0m\n`
    )
})

export default sequelize
