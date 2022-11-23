const localisation = {
  common: {
    save: {
      fr: 'Enregistrer',
      nl: 'Enregistrer',
      en: 'Enregistrer',
    },
  },
  radium: {
    detailModal: {
      title: {
        fr: 'Modifier le chantier',
        nl: 'Modifier le chantier',
        en: 'Modifier le chantier',
      },
      workColor: {
        fr: 'Couleur du chantier',
        nl: 'Couleur du chantier',
        en: 'Couleur du chantier',
      },
    },
    columnTitle: {
      description: {
        fr: 'Description',
        nl: 'Description',
        en: 'Description',
      },
      note: {
        fr: 'Note',
        nl: 'Note',
        en: 'Note',
      },
      colt: {
        fr: 'CoLT',
        nl: 'CoLT',
        en: 'CoLT',
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

export const getLocal = (hierarchy: Array<string>) => {
  const profile: Profile = useState<Profile>('profile').value
  const chosenLanguage = profile.chosenLanguage
  let target = localisation

  for (let item of hierarchy) {
    target = target[item]
  }

  return target[chosenLanguage]
}
