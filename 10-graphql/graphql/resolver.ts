import { Request } from 'express'

import User from '@model/user'

export default {
  user: {
    list: async () => {
      const users = await User.findAll({ include: 'posts' })
      return users.map(user => user.toJSON())
    },
    create: async (args: { email: string; password: string }, req: Request) => {
      const user = (await User.create(args)).toJSON()
      return { ...user, posts: [] }
    }
  }
}
