import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  let loggedUserCircles: Circle[] = []
  let loggedUserTeams: Team[] = []

  const loggedUser = await $fetch('/api/common/getLoggedUser')

  if (loggedUser) {
    const loggedUserTeamLinks = await prisma.teamUser.findMany({
      where: {
        userId: loggedUser.id
      },
      include: {
        team: {
          include: {
            circle: {
              include: {
                teams: true
              }
            },
          }
        }
      }
    })
  
    for (const loggedUserTeamLink of loggedUserTeamLinks) {
      const circle = loggedUserTeamLink.team.circle

      // @ts-ignore
      loggedUserTeams.push(loggedUserTeamLink.team)

      if (!loggedUser.isAdmin && !loggedUserCircles.find((c) => circle.id == circle.id)) {
        // @ts-ignore
        loggedUserCircles.push(circle)
      }
    }

    if (loggedUser.isAdmin) {
      const allCircles = await prisma.circle.findMany({
        include: {
          teams: true,
        }
      })

      // @ts-ignore
      loggedUserCircles = allCircles
    }
  }

  return {
    loggedUserCircles: loggedUserCircles,
    loggedUserTeams: loggedUserTeams
  }
})
