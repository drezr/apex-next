import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  console.log('Removing all works...')

  await prisma.work.deleteMany({})

  console.log('Done !')

  return 'Done'
})
