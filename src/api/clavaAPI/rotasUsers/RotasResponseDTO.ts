import { IUser, IRotas } from "@/api/clavaAPI/rota/RotasResponseDTO"

export type IUsersList = Array<IUser>
export type IRotasList = Array<IRotas>

export interface RotasResponseDTO {
  users: IUsersList
  rotas: IRotasList
}
