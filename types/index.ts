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
    color: string
  }

  interface Work {
    id: number
    color: string
    rows: Array<WorkRow>
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
