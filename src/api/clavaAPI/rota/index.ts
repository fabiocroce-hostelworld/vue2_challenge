import { Api } from "@/api"
import { Rotas } from "@/models/Rotas"
import { IRotas } from "@/api/clavaAPI/rota/RotasResponseDTO"
import { GenerateResponseDTO } from "@/api/clavaAPI/rota/GenerateResponseDTO"

export default class Client {
  constructor(private api: Api) {}

  async fetchRota(rotaId: number): Promise<IRotas> {
    const { data } = await this.api.get<IRotas>(`api/rota/${rotaId}`)

    return new Rotas(data)
  }

  async generateRota(date: string): Promise<number | undefined> {
    const { data } = await this.api.get<GenerateResponseDTO>(`api/generate`, { date })

    if (data.status !== "OK") {
      throw new Error("Error generating rota")
    }
    return data.rotaId
  }
}
