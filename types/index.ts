interface User {
  id: number,
  username: string,
  email: string,
  name: string,
  role?: string,
  rank?: string,
  phone?: string,
  chosenLanguage: string,
  isAdmin: boolean,
  teams: TeamUser[],
  attendings: Attendant[],
}

interface Circle {
  id: number,
  name: string,
  teams: Team[],
}

interface Team {
  id: number,
  name: string,
  circle: Circle,
  circleId: number,
  apps: App[],
  users: TeamUser[],
  parts: Part[],
}

interface App {
  id: number,
  name: string,
  team: Team,
  teamId: number,
  works: AppWork[],
  columnConfigs: ColumnConfig[],
}

interface ColumnConfig {
  id: number,
  name: string,
  width: number,
  isVisible: boolean,
  isClickable: boolean,
  clickAction: string,
  clickValue: string,
  position: number,
  app: App,
  appId: number,
  subColumnConfigs: SubColumnConfig[],
}

interface SubColumnConfig {
  id: number,
  name: string,
  width: number,
  position: number,
  columnConfig: ColumnConfig,
  columnConfigId: number,
}

interface Work {
  id: number,
  color?: string,
  date: Date,
  apps: AppWork[],
  rows: Row[],
  limits: Limit[],
  shifts: Shift[],
}

interface Row {
  id: number,
  name: string,
  value?: string,
  color?: string,
  position: number,
  work: Work,
  workId: number,
}

interface Limit {
  id: number,
  fromLine?: string,
  fromStation?: string,
  fromLane?: string,
  fromSignal?: string,
  fromPK?: string,
  toLine?: string,
  toStation?: string,
  toLane?: string,
  toSignal?: string,
  toPK?: string,
  color?: string,
  position: number,
  work: Work,
  workId: number,
}

interface Shift {
  id: number,
  date?: string,
  schedule?: string,
  color?: string,
  position: number,
  work: Work,
  workId: number,
  parts: Part[],
}

interface Part {
  id: number,
  need?: string,
  description?: string,
  shift: Shift,
  shiftId: number,
  team: Team,
  teamId: number,
  attendants: Attendant[],
}

interface Attendant {
  id: number,
  isAvailable: boolean,
  isAttending: boolean,
  part: Part,
  partId: number,
  user: User,
  userId: number,
}

interface TeamUser {
  id: number,
  position: number,
  team: Team,
  teamId: number,
  user: User,
  userId: number,
}

interface AppWork {
  id: number,
  position: number,
  app: App,
  appId: number,
  work: Work,
  workId: number,
}
