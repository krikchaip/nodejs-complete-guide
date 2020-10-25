export default {
  healthcheck: async () => 'Works fine!',
  create: () => ({
    user: async (args: { email: string; password: string }) => {
      const { email, password } = args
    }
  })
}
