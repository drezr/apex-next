// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT




export interface User {
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

export interface Circle {
    id: number,
    name: string,
    teams: Team[],
}

export interface Team {
    id: number,
    name: string,
    circle: Circle,
    circleId: number,
    apps: App[],
    users: TeamUser[],
    parts: Part[],
}

export interface App {
    id: number,
    name: string,
    team: Team,
    teamId: number,
    works: AppWork[],
    columnConfigs: ColumnConfig[],
}

export interface ColumnConfig {
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

export interface SubColumnConfig {
    id: number,
    name: string,
    width: number,
    position: number,
    columnConfig: ColumnConfig,
    columnConfigId: number,
}

export interface Work {
    id: number,
    color?: string,
    date: Date,
    apps: AppWork[],
    rows: Row[],
    limits: Limit[],
    shifts: Shift[],
}

export interface Row {
    id: number,
    name: string,
    value?: string,
    color?: string,
    position: number,
    work: Work,
    workId: number,
}

export interface Limit {
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

export interface Shift {
    id: number,
    date?: string,
    schedule?: string,
    color?: string,
    position: number,
    work: Work,
    workId: number,
    parts: Part[],
}

export interface Part {
    id: number,
    need?: string,
    description?: string,
    shift: Shift,
    shiftId: number,
    team: Team,
    teamId: number,
    attendants: Attendant[],
}

export interface Attendant {
    id: number,
    isAvailable: boolean,
    isAttending: boolean,
    part: Part,
    partId: number,
    user: User,
    userId: number,
}

export interface TeamUser {
    id: number,
    position: number,
    team: Team,
    teamId: number,
    user: User,
    userId: number,
}

export interface AppWork {
    id: number,
    position: number,
    app: App,
    appId: number,
    work: Work,
    workId: number,
}
