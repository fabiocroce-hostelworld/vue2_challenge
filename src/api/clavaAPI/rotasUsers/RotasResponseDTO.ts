import { IRotas } from "@/api/clavaAPI/rota/RotasResponseDTO"

export interface IUser {
  userId: number
  user: string
}

export type IUsersList = Array<IUser>
export type IRotasList = Array<IRotas>

export interface RotasResponseDTO {
  users: IUsersList
  rotas: IRotasList
}
