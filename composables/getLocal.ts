const localisation = {
  radium: {
    columnTitle: {
      description: {
        fr: 'Description',
        nl: 'Description',
        en: 'Description',
      },
      schedule: {
        fr: 'Horaire',
        nl: 'Schedule',
        en: 'Schedule',
      },
      week: {
        fr: 'Semaine',
        nl: 'Week',
        en: 'Week',
      },
      date: {
        fr: 'Date',
        nl: 'Date',
        en: 'Date',
      },
      shift: {
        fr: 'Prestation',
        nl: 'Shift',
        en: 'Shift',
      },
    },
  },
}

export const getLocal = (hierarchy: any) => {
  const profile: Profile = useProfile().value
  const chosenLanguage = profile.chosenLanguage
  let target = localisation

  for (let item of hierarchy) {
    target = target[item]
  }

  return target[chosenLanguage]
}
