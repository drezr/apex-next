export {}

declare global {
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
    date: string
    schedule: string
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
