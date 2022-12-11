export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      color: 'orange',
      rows: [
        {
          id: 1,
          name: 'description',
          value:
            'Work <b>description</b> <span style="color: #F44336">#1</span>',
          color: null,
          position: 0,
        },
        {
          id: 2,
          name: 'description',
          value: 'Work description #2',
          color: 'green',
          position: 1,
        },
        {
          id: 3,
          name: 'note',
          value: 'Work note #1',
          color: 'red',
          position: 1,
        },
        {
          id: 4,
          name: 'colt',
          value: '6953',
          color: 'blue',
          position: 1,
        },
      ],
      shifts: [
        {
          id: 1,
          date: '2023-01-01',
          schedule: '08-16',
          color: 'blue',
          position: 0,
        },
      ],
    },
    {
      id: 2,
      color: 'purple',
      rows: [
        {
          id: 1,
          name: 'description',
          value: 'Work <b>description</b> <span style="color: red;">#3</span>',
          color: null,
          position: 0,
        },
        {
          id: 2,
          name: 'description',
          value: 'Work description #4',
          color: 'green',
          position: 1,
        },
        {
          id: 3,
          name: 'note',
          value: 'Work note #2',
          color: 'red',
          position: 1,
        },
        {
          id: 4,
          name: 'colt',
          value: '6953',
          color: 'blue',
          position: 1,
        },
      ],
      shifts: [
        {
          id: 1,
          date: '2023-01-01',
          schedule: '08-16',
          color: null,
          position: 0,
        },
      ],
    },
  ]
})
