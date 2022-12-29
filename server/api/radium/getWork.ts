import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const params: any = getQuery(event)

  const workId: number = parseInt(params.workId)

  const work = await prisma.work.findUnique({
    where: {
      id: workId,
    },
    include: {
      shifts: {
        include: {
          parts: {
            include: {
              team: {
                include: {
                  users: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
              attendants: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
      rows: true,
      limits: true,
    },
  })

  return work
})
