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
    FETCH_ROTAS: "fetchRotas",
    FETCH_ROTA: "fetchRota",
    GENERATE_ROTA: "generateRota"
  }
}

describe("VuexHelpers", () => {
  it("addNamespacePrefix to add prefix rotas to the getters, mutations and actions", () => {
    expect(addNamespacePrefix(types, "rotas")).toEqual({
      actions: { FETCH_ROTA: "rotas/fetchRota", FETCH_ROTAS: "rotas/fetchRotas", GENERATE_ROTA: "rotas/generateRota" },
      getters: { GET_ROTAS: "rotas/GET_ROTAS" },
      mutations: { STORE_ROTA: "rotas/STORE_ROTA", STORE_ROTAS: "rotas/STORE_ROTAS" }
    })
  })
})
