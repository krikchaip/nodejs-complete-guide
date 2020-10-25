/// <reference path="../typings/global.d.ts" />

import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

import sequelize from '@config/sequelize'
import Post from '@model/post'

interface UserAttributes {
  id: UUID
  email: STRING
  password: STRING
  name?: STRING
  status?: TEXT
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  posts?: typeof Post[]
}

const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
    set(val: string) {
      this.setDataValue('password', bcrypt.hashSync(val, 10))
    }
  },
  name: DataTypes.STRING,
  status: DataTypes.TEXT
})

export default User
