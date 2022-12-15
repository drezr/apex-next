export {}

declare global {
  // This breaks VS Code IntelliSense
  //   type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  //   type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

  //   type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
  //   type MM = `0${oneToNine}` | `1${0 | 1 | 2}`
  //   type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`

  //   type DateString = `${YYYY}-${MM}-${DD}`

  interface Profile {
    id?: number
    name: string
    chosenLanguage: string
  }

  interface WorkRow {
    id?: number
    name: string
    value: string
    color: string
    position: number
  }

  interface WorkShift {
    id?: number
    date: string
    schedule: string
    color: string
    position: number
  }

  interface WorkLimit {
    id?: number
    fromLine: string
    fromStation: string
    fromLane: string
    fromSignal: string
    fromPK: string
    toLine: string
    toStation: string
    toLane: string
    toSignal: string
    toPK: string
    color: string
    position: number
  }

  interface Work {
    id?: number
    color: string
    rows: Array<WorkRow>
    shifts: Array<WorkShift>
    limits: Array<WorkLimit>
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
    isClickable: boolean
    clickAction: string
    clickValue: string
    subColumns: Array<SubColumn>
  }
}
