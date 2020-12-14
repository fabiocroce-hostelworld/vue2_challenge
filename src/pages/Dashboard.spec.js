import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { storeConfig, rotasTypes, usersTypes } from "@/store"
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

    expect(wrapper.findAll("rotas-container-stub").length).toBe(0)
    expect(wrapper.findAll("v-progress-circular-stub").length).toBe(1)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("test dom elements if API call is successful", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: rotaUsersMock, status: 200 })
    const wrapper = shallowMount(Dashboard, input)

    await flushPromises()

    expect(wrapper.findAll("rotas-container-stub").length).toBe(1)
    expect(wrapper.findAll("v-progress-circular-stub").length).toBe(0)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("test if data is inside vuex store if API call is succesful", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: rotaUsersMock, status: 200 })
    shallowMount(Dashboard, input)

    await flushPromises()

    expect(alertProvider.addSuccessAlert).toHaveBeenCalled()
    expect(store.getters[rotasTypes.getters.GET_ROTAS]).toEqual(rotaUsersMock.rotas)
    expect(store.getters[usersTypes.getters.GET_USERS]).toEqual(rotaUsersMock.users)
  })

  it("test if API call fails", async () => {
    mockAxiosGet.mockRejectedValue()
    shallowMount(Dashboard, input)

    await flushPromises()

    expect(alertProvider.addErrorAlert).toHaveBeenCalled()
  })
})
