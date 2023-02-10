import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  console.log('Creating root...')

  await prisma.circle.create({
    data: {
      name: 'Main Circle',
      teams: {
        create: {
          name: 'Main Team',
          apps: {
            create: {
              name: 'radium',
            },
          },
          users: {
            create: {
              user: {
                create: {
                  username: 'ABC123',
                  email: 'admin.user@infrabel.be',
                  name: 'Admin User',
                  role: 'Role',
                  rank: 'Rank',
                  chosenLanguage: 'fr',
                  isAdmin: true,
                },
              },
              position: 0,
            },
          },
        },
      },
    },
  })


  await prisma.circle.create({
    data: {
      name: 'Secondary Circle',
      teams: {
        create: {
          name: 'Secondary Team',
          apps: {
            create: {
              name: 'radium',
            },
          },
          users: {
            create: {
              user: {
                create: {
                  username: 'DEF456',
                  email: 'random.user@infrabel.be',
                  name: 'Random User',
                  role: 'Role',
                  rank: 'Rank',
                  chosenLanguage: 'fr',
                  isAdmin: false,
                },
              },
              position: 0,
            },
          },
        },
      },
    },
  })

  console.log('Done !')

  return 'Done'
})
