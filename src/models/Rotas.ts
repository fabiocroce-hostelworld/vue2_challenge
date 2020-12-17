import { IRotaPeriod, IRota, IRotas, ShiftTypes } from "@/api/clavaAPI/rota/RotasResponseDTO"

class Period {
  public startDate: string
  public endDate: string

  constructor({ startDate, endDate }: IRotaPeriod) {
    this.startDate = startDate
    this.endDate = endDate
  }
}

class Rota {
  public userId: number
  public type: ShiftTypes
  public date: string

  constructor({ userId, type, date }: IRota) {
    this.userId = userId
    this.type = type
    this.date = date
  }
}

export class Rotas {
  public rotaID: number
  public period: Period
  public rota: Array<Rota>

  constructor({ rotaID, period, rota }: IRotas) {
    this.rotaID = rotaID
    this.period = new Period(period)
    this.rota = rota.map((currentRota: IRota) => new Rota(currentRota))
  }
}
