import { setupStoreProvider } from "@/providers/storeProvider"
import { storeConfig, rotasTypes } from "@/store"
import Vuex from "vuex"

describe("storeProvider", () => {
  it("test reactiveGetter", () => {
    const store = new Vuex.Store(storeConfig)
    const storeProvider = setupStoreProvider(store)

    expect(storeProvider.reactiveGetter(rotasTypes.getters.GET_ROTAS)).toEqual({ value: [] })
  })
})
