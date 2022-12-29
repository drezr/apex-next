import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const params: any = getQuery(event)

  const month: string = params.month
  const year: string = params.year
  const appId: number = parseInt(params.appId)

  const startDate = new Date(`${year}-${month}-01`)
  const enDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1)

  const works = await prisma.work.findMany({
    where: {
      apps: {
        some: {
          appId: appId,
        },
      },
      date: {
        gte: startDate,
        lte: enDate,
      },
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

  return works
})
