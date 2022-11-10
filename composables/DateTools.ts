class DateTools {
  formatDatetimeNoYear(datetime: DateString) {
    let [year, month, day] = datetime.split('-')

    if (day.length == 1) day = '0' + day
    if (month.length == 1) month = '0' + month

    return `${day}/${month}`
  }
}

export default new DateTools()
