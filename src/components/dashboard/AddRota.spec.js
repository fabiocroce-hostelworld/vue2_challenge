import Vuex from "vuex"
import { mount, createLocalVue } from "@vue/test-utils"
import { storeConfig, rotasTypes } from "@/store"
import AddRota from "@/components/dashboard/AddRota"
import rotaUsersMock from "@/api/clavaAPI/rotasUsers/rotasResponse.mock"
import { setupStoreProvider, storeRef } from "@/providers/storeProvider"
import { setupAlertProvider, alertRef } from "@/providers/alertProvider"
import { mockAxiosGet } from "@/mock"
import flushPromises from "flush-promises"

const alertProvider = setupAlertProvider({})
alertProvider.addErrorAlert = jest.fn()
alertProvider.addSuccessAlert = jest.fn()

describe("AddRota", () => {
  let input
  let localVue
  let store

  beforeEach(() => {
    localVue = createLocalVue()
    store = new Vuex.Store(storeConfig)

    input = {
      localVue,
      propsData: {
        today: new Date("2020-12-20").toISOString().substr(0, 10)
      },
      provide: {
        [storeRef]: setupStoreProvider(store),
        [alertRef]: alertProvider
      }
    }
  })

  it("Snapshot test", () => {
    const wrapper = mount(AddRota, input)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("test successful route generation", async () => {
    const wrapper = mount(AddRota, input)

    mockAxiosGet
      .mockResolvedValueOnce({ data: { status: "OK", rotaid: 13 }, status: 200 })
      .mockResolvedValueOnce({ data: rotaUsersMock.rotas[0], status: 200 })

    wrapper.find(".generate-route").trigger("click")
    await flushPromises()

    expect(alertProvider.addSuccessAlert).toHaveBeenCalled()
    expect(store.getters[rotasTypes.getters.GET_ROTAS]).toEqual([rotaUsersMock.rotas[0]])
  })

  it("test failed route generation", async () => {
    const wrapper = mount(AddRota, input)

    mockAxiosGet.mockRejectedValueOnce()

    wrapper.find(".generate-route").trigger("click")
    await flushPromises()

    expect(alertProvider.addErrorAlert).toHaveBeenCalled()
    expect(store.getters[rotasTypes.getters.GET_ROTAS]).toEqual([])
  })

  it("test failed route generation when status is not ok", async () => {
    const wrapper = mount(AddRota, input)

    mockAxiosGet.mockResolvedValueOnce({ data: { status: "NOT_FOUND" }, status: 404 })

    wrapper.find(".generate-route").trigger("click")
    await flushPromises()

    expect(alertProvider.addErrorAlert).toHaveBeenCalled()
    expect(store.getters[rotasTypes.getters.GET_ROTAS]).toEqual([])
  })
})
