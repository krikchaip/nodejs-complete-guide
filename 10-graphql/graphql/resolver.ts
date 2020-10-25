import User from '@model/user'

export default {
  /* Query */
  healthcheck: async () => 'Works fine!',
  users: async () => {
    const posts = await User.findAll({ include: 'posts' })
    return posts.map(post => post.toJSON())
  },

  /* Mutation */
  create: () => ({
    user: async (args: { email: string; password: string }) => {
      const user = (await User.create(args)).toJSON()
      return { ...user, posts: [] }
    }
  })
}
