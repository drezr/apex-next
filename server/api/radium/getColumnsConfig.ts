export default defineEventHandler((event) => {
  return [
    {
      name: 'description',
      position: 1,
      width: '300',
      visible: true,
      subColumns: [],
    },
    {
      name: 'shift',
      position: 0,
      width: '170',
      visible: true,
      subColumns: [
        { name: 'week', width: '33' },
        { name: 'date', width: '33' },
        { name: 'schedule', width: '34' },
      ],
    },
  ]
})
