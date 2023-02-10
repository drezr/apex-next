const localisation = {
  common: {
    draft: {
      fr: 'Draft',
      nl: 'Draft',
      en: 'Draft',
    },
    planner: {
      fr: 'Planner',
      nl: 'Planner',
      en: 'Planner',
    },
    radium: {
      fr: 'Radium',
      nl: 'Radium',
      en: 'Radium',
    },
    watcher: {
      fr: 'Watcher',
      nl: 'Watcher',
      en: 'Watcher',
    },
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
  home: {
    myTeams: {
      fr: 'Mes équipes',
      nl: 'Mes équipes',
      en: 'Mes équipes',
    },
    myCircles: {
      fr: 'Mes cercles',
      nl: 'Mes cercles',
      en: 'Mes cercles',
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
  const loggedUser: User = useState<User>('loggedUser').value
  const chosenLanguage: string = loggedUser.chosenLanguage
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
