import { Request } from 'express'
import validator from 'validator'

import User from '@model/user'

export default {
  user: {
    list: async () => {
      const users = await User.findAll({ include: 'posts' })
      return users.map(user => user.toJSON())
    },
    create: async (args: { email: string; password: string }, req: Request) => {
      const errors = [
        !validator.isEmail(args.email) && 'Wrong email format!',
        validator.isEmpty(args.password) && 'No password entered!',
        !validator.isLength(args.password, { min: 5 }) &&
          'Password must contain atleast 5 characters!',
        (await User.findOne({ where: { email: args.email } })) &&
          'Email exists!'
      ]
        .filter((msg): msg is string => !!msg)
        .map(msg => new Error(msg))

      if (errors.length) {
        throw errors[0]
      }

      try {
        const user = (await User.create(args)).toJSON()
        return { ...user, posts: [] }
      } catch (error) {
        throw new Error(error.message || 'Internal server error!')
      }
    }
  }
}