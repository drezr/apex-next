export default class DateTools {
  formatDatetimeNoYear(datetime: string | null) {
    /**
     * Returns datetime with the following format: DD/MM
     *
     * @param {string | null} datetime the date to convert. Expected format 'YYYY-MM-DD'
     */

    if (datetime) {
      let [year, month, day] = datetime.split('-')

      if (day.length == 1) day = '0' + day
      if (month.length == 1) month = '0' + month

      return `${day}/${month}`
    }

    return null
  }

  formatDatetimeDayNameNoYear(datetime: string | null) {
    /**
     * Returns day name and datetime with the following format: DAYNAME DD/MM
     *
     * @param {string | null} datetime the date to convert. Expected format 'YYYY-MM-DD'
     */

    if (datetime) {
      const profile: Profile = useState<Profile>('profile').value
      const chosenLanguage: string = profile.chosenLanguage

      let [year, month, day] = datetime.split('-')

      if (day.length == 1) day = '0' + day
      if (month.length == 1) month = '0' + month

      const date = new Date(datetime)
      const dayName = date.toLocaleString('fr-fr', { weekday: 'long' })

      return `${dayName[0].toUpperCase() + dayName.slice(1)} ${day}/${month}`
    }

    return null
  }

  getWeek(datetime: string | null) {
    if (datetime) {
      const date = new Date(datetime)
      date.setHours(0, 0, 0, 0)
      date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
      var week1 = new Date(date.getFullYear(), 0, 4)
      return (
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        )
      )
    }

    return null
  }
}
