import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const params: any = getQuery(event)

  const teamId: number = parseInt(params.teamId)

  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
    },
    include: {
      circle: true,
      apps: true,
    },
  })

  return {
    team: team,
  }
})
