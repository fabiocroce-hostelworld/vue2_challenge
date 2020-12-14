import { getRotaServices } from "@/api/clavaAPI"
import { Rotas } from "@/models/Rotas"
import { addNamespacePrefix } from "@/utils/vuexHelpers"

const types = {
  getters: {
    GET_ROTAS: "GET_ROTAS"
  },
  mutations: {
    STORE_ROTAS: "STORE_ROTAS",
    STORE_ROTA: "STORE_ROTA"
  },
  actions: {
    FETCH_ROTA: "fetchRota",
    GENERATE_ROTA: "generateRota"
  }
}

export const rotasTypes = addNamespacePrefix(types, "rotas")

type RotasState = {
  rotas: Array<Rotas>
}

export default {
  namespaced: true,
  state: (): RotasState => ({
    rotas: [] as Array<Rotas>
  }),
  getters: {
    [types.getters.GET_ROTAS](state: RotasState) {
      return state.rotas
    }
  },
  actions: {
    [types.actions.FETCH_ROTA]: async ({ commit }: { commit: Function }, rotaId: number) => {
      const rota = await getRotaServices().fetchRota(rotaId)

      commit(types.mutations.STORE_ROTA, rota)
    },
    [types.actions.GENERATE_ROTA]: async ({ dispatch }: { dispatch: Function }, date: string) => {
      const rotaId = await getRotaServices().generateRota(date)

      await dispatch(types.actions.FETCH_ROTA, rotaId)
    }
  },
  mutations: {
    [types.mutations.STORE_ROTAS]: (state: RotasState, rotas: Array<Rotas>) => {
      state.rotas = rotas
    },
    [types.mutations.STORE_ROTA]: (state: RotasState, rota: Rotas) => {
      state.rotas.push(rota)
    }
  }
}
