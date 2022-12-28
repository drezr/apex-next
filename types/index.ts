export {}

declare global {
  interface Profile {
    id?: number
    name: string
    role: string
    rank: string
    phone: string
    chosenLanguage: string
  }

  interface Team {
    id?: number
    name: string
  }

  interface Work {
    id?: number
    color: string
    link: Object
    rows: Array<WorkRow>
    shifts: Array<WorkShift>
    limits: Array<WorkLimit>
  }

  interface WorkShift {
    id?: number
    date: string
    schedule: string
    color: string
    position: number
    parts: Array<ShiftPart>
  }

  interface ShiftPart {
    id?: number
    team: Team
    participants: Array<PartParticipant>
  }

  interface PartParticipant {
    id?: number
    profile: Profile
    partParticipant: PartParticipantLink
  }

  interface PartParticipantLink {
    id?: number
    isAvailable: boolean
    isParticipant: boolean
  }

  interface WorkRow {
    id?: number
    name: string
    value: string
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
