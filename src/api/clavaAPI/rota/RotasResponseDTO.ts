export interface IUser {
  userId: number
  user: string
}

export interface IRotaPeriod {
  startDate: string
  endDate: string
}

export enum ShiftTypes {
  MORNING = "morning",
  AFTERNOON = "afternoon"
}
export interface IRota {
  userId: number
  type: ShiftTypes
  date: string
}

export interface IRotas {
  rotaID: number
  period: IRotaPeriod
  rota: Array<IRota>
}
