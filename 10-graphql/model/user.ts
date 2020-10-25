import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

import sequelize from '@config/sequelize'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    async set(val: string) {
      this.setDataValue('password', await bcrypt.hash(val, 10))
    }
  },
  name: DataTypes.STRING,
  status: DataTypes.TEXT
})

export default User
