export {}

declare global {
  type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

  type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
  type MM = `0${oneToNine}` | `1${0 | 1 | 2}`
  type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`

  type DateString = `${YYYY}-${MM}-${DD}`

  interface Profile {
    id: number
    name: string
    chosenLanguage: string
  }

  interface WorkRow {
    id: number
    name: string
    value: string
    position: number
  }

  interface WorkShift {
    id: number
    date: DateString
    schedule: string
    position: number
  }

  interface Work {
    id: number
    color: string
    rows: Array<WorkRow>
    shifts: Array<WorkShift>
  }

  interface SubColumn {
    name: string
    width: number
  }

  interface ColumnConfig {
    name: string
    position: number
    width: number
    isVisible: boolean
    isMultiple: boolean
    subColumns: Array<SubColumn>
  }
}
