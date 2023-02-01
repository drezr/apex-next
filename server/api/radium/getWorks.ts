import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const params: any = getQuery(event)

  const appId: number = parseInt(params.appId)
  const fromDate: Date = new Date(params.fromDate)
  const toDate: Date = new Date(params.toDate)

  const works = await prisma.work.findMany({
    where: {
      apps: {
        some: {
          appId: appId,
        },
      },
      date: {
        gte: fromDate,
        lte: toDate,
      },
    },
    include: {
      shifts: true,
      rows: true,
      limits: true,
      apps: true,
    },
  })

  return works
})
