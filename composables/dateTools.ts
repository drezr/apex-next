class DateTools {
  formatDatetimeNoYear(datetime: DateString) {
    /**
     * Returns datetime with the following format: DD/MM
     *
     * @param {DateString} datetime the date to convert. Expected format 'YYYY-MM-DD'
     */

    let [year, month, day] = datetime.split('-')

    if (day.length == 1) day = '0' + day
    if (month.length == 1) month = '0' + month

    return `${day}/${month}`
  }

  getWeek(datetime: DateString) {
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
}

export default new DateTools()
