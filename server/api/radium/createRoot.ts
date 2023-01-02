import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  console.log('Creating root...')


  await prisma.circle.create({
    data: {
      name: 'Arrondissement 43',
      teams: {
        create: {
          name: 'Huy Signalisation',
          apps: {
            create: {
              name: 'radium'
            }
          },
          users: {
            create: {
              user: {
                create: {
                  username: 'HTQ8901',
                  email: 'ronan.dumont@infrabel.be',
                  name: 'Ronan Dumont',
                  role: 'CTelm',
                  rank: 'ARET',
                  chosenLanguage: 'fr',
                }
              },
              position: 0,
            }
          }
        }
      }
    }
  })

  console.log('Done !')

  return 'Done'
})
