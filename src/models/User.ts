import { IUser } from "@/api/clavaAPI/rota/RotasResponseDTO"

export class User {
  public userId: number
  public user: string

  constructor({ userId, user }: IUser) {
    this.userId = userId
    this.user = user
  }
}
