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
      fr: 'RĂ©initialiser',
      nl: 'RĂ©initialiser',
      en: 'RĂ©initialiser',
    },
    delete: {
      fr: 'Supprimer',
      nl: 'Supprimer',
      en: 'Supprimer',
    },
    copy: {
      fr: 'Copier',
      nl: 'Copier',
      en: 'Copier',
    },
    paste: {
      fr: 'Coller',
      nl: 'Coller',
      en: 'Coller',
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
      addLine: {
        fr: 'Ajouter une ligne',
        nl: 'Ajouter une ligne',
        en: 'Ajouter une ligne',
      },
      informations: {
        fr: 'Informations',
        nl: 'Informations',
        en: 'Informations',
      },
      participations: {
        fr: 'Participations',
        nl: 'Participations',
        en: 'Participations',
      },
      demands: {
        fr: 'Demandes',
        nl: 'Demandes',
        en: 'Demandes',
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
  const profile: User = useState<User>('profile').value
  const chosenLanguage: string = profile.chosenLanguage
  let target: any = localisation

  try {
    for (let item of hierarchy) {
      target = target[item]
    }

    return target[chosenLanguage]
  } catch (e) {
    return hierarchy[hierarchy.length - 1]
  }
}
