import { Api } from "@/api"
import { Rotas, User } from "@/models"
import { RotasResponseDTO } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"

export default class Client {
  constructor(public api: Api) {}

  async fetchUsersAndRotas(): Promise<{ rotas: Array<Rotas>; users: Array<User> }> {
    const { data } = await this.api.get<RotasResponseDTO>("/api/rotas")

    return {
      rotas: data.rotas.map(rota => new Rotas(rota)),
      users: data.users.map(user => new User(user))
    }
  }
}
