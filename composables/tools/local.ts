const localisation = {
  common: {
    save: {
      fr: 'Enregistrer',
      nl: 'Enregistrer',
      en: 'Enregistrer',
    },
    cancel: {
      fr: 'Annuler',
      nl: 'Annuler',
      en: 'Annuler',
    },
    reset: {
      fr: 'Réinitialiser',
      nl: 'Réinitialiser',
      en: 'Réinitialiser',
    },
    from: {
      fr: 'De',
      nl: 'De',
      en: 'De',
    },
    to: {
      fr: 'A',
      nl: 'A',
      en: 'A',
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
      status: {
        fr: 'Statut',
        nl: 'Statut',
        en: 'Statut',
      },
      limit: {
        fr: 'Limites de mise hors service',
        nl: 'Limites de mise hors service',
        en: 'Limites de mise hors service',
      },
      fromLine: {
        fr: 'Ligne',
        nl: 'Ligne',
        en: 'Ligne',
      },
      fromStation: {
        fr: 'Gare',
        nl: 'Gare',
        en: 'Gare',
      },
      fromLane: {
        fr: 'Voie',
        nl: 'Voie',
        en: 'Voie',
      },
      fromSignal: {
        fr: 'Signal',
        nl: 'Signal',
        en: 'Signal',
      },
      fromPK: {
        fr: 'PK',
        nl: 'PK',
        en: 'PK',
      },
      toLine: {
        fr: 'Ligne',
        nl: 'Ligne',
        en: 'Ligne',
      },
      toStation: {
        fr: 'Gare',
        nl: 'Gare',
        en: 'Gare',
      },
      toLane: {
        fr: 'Voie',
        nl: 'Voie',
        en: 'Voie',
      },
      toSignal: {
        fr: 'Signal',
        nl: 'Signal',
        en: 'Signal',
      },
      toPK: {
        fr: 'PK',
        nl: 'PK',
        en: 'PK',
      },
      wielding: {
        fr: 'Soudure',
        nl: 'Soudure',
        en: 'Soudure',
      },
      supervisor: {
        fr: 'Responsable',
        nl: 'Responsable',
        en: 'Responsable',
      },
    },
  },
}

export const getLocal = (hierarchy: Array<string>) => {
  const profile: Profile = useState<Profile>('profile').value
  const chosenLanguage: string = profile.chosenLanguage
  let target: any = localisation

  for (let item of hierarchy) {
    target = target[item]
  }

  return target[chosenLanguage]
}
