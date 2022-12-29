import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
  console.log('Creating random works...')

  const colors = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'brown',
    'blue-grey',
    'grey',
  ]

  for (const i in colors) {
    let shiftDate = new Date(
      `2023-01-${
        parseInt(i) < 9
          ? '0' + String(parseInt(i) + 1)
          : String(parseInt(i) + 1)
      }`
    )

    await prisma.work.create({
      data: {
        color: colors[Math.floor(Math.random() * colors.length)],
        date: new Date('2023-01-01'),
        rows: {
          create: [
            {
              name: 'description',
              value: `Work ${i} <b>description</b> <span style="color: #F44336">#1</span>`,
              color: null,
              position: 0,
            },
            {
              name: 'description',
              value: `Work ${i} description #2`,
              color: colors[Math.floor(Math.random() * colors.length)],
              position: 1,
            },
            {
              name: 'note',
              value: `Work ${i} note #1`,
              color: colors[Math.floor(Math.random() * colors.length)],
              position: 1,
            },
            {
              name: 'colt',
              value: '6953',
              color: colors[Math.floor(Math.random() * colors.length)],
              position: 1,
            },
          ],
        },
        limits: {
          create: {
            fromLine: '125',
            fromStation: 'Huy',
            fromLane: 'A',
            fromSignal: 'KX3R45',
            fromPK: '35000',
            toLine: '125',
            toStation: 'Statte',
            toLane: 'A',
            toSignal: 'HX3R45',
            toPK: '36000',
            color: colors[Math.floor(Math.random() * colors.length)],
            position: 0,
          },
        },
        shifts: {
          create: [
            {
              date: shiftDate,
              schedule: '08-16',
              color: null,
              position: 0,
              parts: {
                create: {
                  need: 'Need',
                  description: 'Description',
                  teamId: 1,
                  attendants: {
                    create: {
                      isAvailable: true,
                      isAttending: true,
                      userId: 1,
                    },
                  },
                },
              },
            },
            {
              date: shiftDate,
              schedule: '22-06',
              color: null,
              position: 0,
              parts: {
                create: {
                  need: 'Need',
                  description: 'Description',
                  teamId: 1,
                  attendants: {
                    create: {
                      isAvailable: true,
                      isAttending: true,
                      userId: 1,
                    },
                  },
                },
              },
            },
          ],
        },
        apps: {
          create: {
            position: parseInt(i),
            appId: 1,
          },
        },
      },
    })
  }

  console.log('Done !')

  return 'Done'
})
