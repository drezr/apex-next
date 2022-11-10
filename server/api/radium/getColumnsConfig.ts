export default defineEventHandler((event) => {
  return [
    {
      name: 'description',
      position: 1,
      width: '300',
      isVisible: true,
      isMultiple: true,
      subColumns: [],
    },
    {
      name: 'note',
      position: 2,
      width: '300',
      isVisible: true,
      isMultiple: false,
      subColumns: [],
    },
    {
      name: 'shift',
      position: 0,
      width: '170',
      isVisible: true,
      isMultiple: true,
      subColumns: [
        { name: 'week', width: '33' },
        { name: 'date', width: '33' },
        { name: 'schedule', width: '34' },
      ],
    },
  ]
})
