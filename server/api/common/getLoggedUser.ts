import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findFirst()

  return user
})
