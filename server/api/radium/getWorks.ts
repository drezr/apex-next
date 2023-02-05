import prisma from '~/server/prisma'

const columnConfigs = [
  {
    name: 'shift',
    position: 0,
    width: '170',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [
      { name: 'week', width: '33' },
      { name: 'date', width: '33' },
      { name: 'schedule', width: '34' },
    ],
  },
  {
    name: 'description',
    position: 1,
    width: '300',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [],
  },
  {
    name: 'note',
    position: 2,
    width: '150',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [],
  },
  {
    name: 'colt',
    position: 3,
    width: '100',
    isVisible: true,
    isClickable: true,
    clickAction: 'url',
    clickValue: 'https://google.be/search?q=',
    subColumnConfigs: [],
  },
  {
    name: 'status',
    position: 4,
    width: '100',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [],
  },
  {
    name: 'limit',
    position: 5,
    width: '600',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [
      { name: 'fromLine', width: '7' },
      { name: 'fromStation', width: '18' },
      { name: 'fromLane', width: '5' },
      { name: 'fromSignal', width: '10' },
      { name: 'fromPK', width: '10' },
      { name: 'toLine', width: '7' },
      { name: 'toStation', width: '18' },
      { name: 'toLane', width: '5' },
      { name: 'toSignal', width: '10' },
      { name: 'toPK', width: '10' },
    ],
  },
  {
    name: 'wielding',
    position: 6,
    width: '100',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [],
  },
  {
    name: 'supervisor',
    position: 7,
    width: '100',
    isVisible: true,
    isClickable: false,
    clickAction: null,
    clickValue: null,
    subColumnConfigs: [],
  },
]

export default defineEventHandler(async (event) => {
  const params: any = getQuery(event)

  const appId: number = parseInt(params.appId)
  const fromDate: Date = new Date(params.fromDate)
  const toDate: Date = new Date(params.toDate)

  const app = await prisma.app.findUnique({
    where: {
      id: appId,
    },
    include: {
      team: true,
    },
  })

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

  return {
    app: app,
    works: works,
    columnConfigs: columnConfigs,
  }
})
