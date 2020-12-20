import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { storeConfig } from "@/store"
import Dashboard from "@/pages/Dashboard"
import rotaUsersMock from "@/api/clavaAPI/rotasUsers/rotasResponse.mock"
import { setupStoreProvider, storeRef } from "@/providers/storeProvider"
import { setupAlertProvider, alertRef } from "@/providers/alertProvider"
import { mockAxiosGet } from "@/mock"
import flushPromises from "flush-promises"

const alertProvider = setupAlertProvider({})
alertProvider.addErrorAlert = jest.fn()
alertProvider.addSuccessAlert = jest.fn()

describe("Dashboard", () => {
  let input
  let localVue
  let store

  beforeEach(() => {
    localVue = createLocalVue()
    store = new Vuex.Store(storeConfig)

    input = {
      localVue,
      provide: {
        [storeRef]: setupStoreProvider(store),
        [alertRef]: alertProvider
      }
    }
  })

  it("Snapshot test - loading", () => {
    const wrapper = shallowMount(Dashboard, input)

    expect(wrapper.findAll(".rotas-container").length).toBe(0)
    expect(wrapper.findAll("v-progress-circular-stub").length).toBe(1)
    expect(wrapper.findAll(".alerts").length).toBe(0)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("Snapshot test - loaded", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: rotaUsersMock, status: 200 })
    const wrapper = shallowMount(Dashboard, input)

    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("Snapshot test - failed", async () => {
    mockAxiosGet.mockRejectedValue({ message: "error" })
    const wrapper = shallowMount(Dashboard, input)

    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("test if when data is fetched if the rotas container and alert appears", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: rotaUsersMock, status: 200 })
    const wrapper = shallowMount(Dashboard, input)

    await flushPromises()

    expect(alertProvider.addSuccessAlert).toHaveBeenCalled()

    expect(wrapper.findAll(".rotas-container").length).toBe(1)
    expect(wrapper.findAll("v-progress-circular-stub").length).toBe(0)
  })

  it("test if API call fails", async () => {
    mockAxiosGet.mockRejectedValue({ message: "error" })
    const wrapper = shallowMount(Dashboard, input)

    await flushPromises()

    expect(wrapper.findAll(".rotas-container").length).toBe(0)
    expect(wrapper.findAll("v-progress-circular-stub").length).toBe(1)
    expect(alertProvider.addErrorAlert).toHaveBeenCalled()
  })
})
