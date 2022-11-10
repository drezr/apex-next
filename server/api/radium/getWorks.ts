export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      color: 'orange',
      rows: [
        {
          id: 1,
          name: 'description',
          value: 'Work <b>description</b> <span style="color: red;">#1</span>',
          position: 0,
          color: 'red',
        },
        {
          id: 2,
          name: 'description',
          value: 'Work description #2',
          position: 1,
          color: 'blue',
        },
      ],
    },
    {
      id: 2,
      color: 'purple',
      rows: [
        {
          id: 3,
          name: 'description',
          value: 'Work description #3',
          position: 0,
          color: 'green',
        },
        {
          id: 4,
          name: 'description',
          value: 'Work description #4',
          position: 1,
          color: 'purple',
        },
      ],
    },
  ]
})
