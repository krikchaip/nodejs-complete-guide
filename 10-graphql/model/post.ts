import { DataTypes } from 'sequelize'

import sequelize from '@config/sequelize'

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: DataTypes.TEXT,
  imageURL: DataTypes.TEXT
})

export default Post
