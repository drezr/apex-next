export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      color: 'orange',
      link: {
        position: 0,
      },
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
      limits: [
        {
          id: 1,
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
          color: 'purple',
          position: 0,
        },
      ],
      parts: [],
    },
    {
      id: 2,
      color: 'purple',
      link: {
        position: 1,
      },
      rows: [
        {
          id: 1,
          name: 'description',
          value:
            'Work <b>description</b> <span style="color: #F44336;">#3</span>',
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
      limits: [],
      parts: [],
    },
    {
      id: 3,
      color: null,
      link: {
        position: 2,
      },
      rows: [],
      shifts: [],
      limits: [],
      parts: [],
    },
  ]
})
