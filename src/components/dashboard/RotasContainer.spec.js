import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { storeConfig, usersTypes } from "@/store"
import RotasContainer from "@/components/dashboard/RotasContainer"
import rotaUsersMock from "@/api/clavaAPI/rotasUsers/rotasResponse.mock"
import { setupStoreProvider, storeRef } from "@/providers/storeProvider"

describe("RotasContainer", () => {
  let input
  let localVue
  let store

  beforeEach(() => {
    localVue = createLocalVue()
    store = new Vuex.Store(storeConfig)

    store.commit(usersTypes.mutations.STORE_USERS, rotaUsersMock.users)

    input = {
      localVue,
      provide: {
        [storeRef]: setupStoreProvider(store)
      }
    }
  })

  it("Snapshot test - tab calendar", async () => {
    const wrapper = shallowMount(RotasContainer, input)
    wrapper.find(".add-rota").setProps({ today: "2020-12-17" })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("Snapshot test - tab list", async () => {
    const wrapper = shallowMount(RotasContainer, input)
    wrapper.find(".add-rota").setProps({ today: "2020-12-17" })
    wrapper.find(".tab-list").trigger("click")

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("when change event emitted expect RotasDisplay to send selectedUsers to RotasCalendar", async () => {
    const wrapper = shallowMount(RotasContainer, input)
    const usersListComponent = wrapper.find(".users-list")

    expect(wrapper.find(".rotas-calendar").props().selectedUsers).toEqual(new Set())

    await usersListComponent.vm.$emit("change", [1, 2])

    expect(wrapper.find(".rotas-calendar").props().selectedUsers).toEqual(new Set([1, 2]))
    expect(usersListComponent.props().users).toBe(rotaUsersMock.users)
  })

  it("when change event emitted expect RotasDisplay to send selectedUsers to RotasList", async () => {
    const wrapper = shallowMount(RotasContainer, input)
    wrapper.find(".tab-list").trigger("click")

    const usersListComponent = wrapper.find(".users-list")

    expect(wrapper.find(".rotas-list").props().selectedUsers).toEqual(new Set())

    await usersListComponent.vm.$emit("change", [1, 2])

    expect(wrapper.find(".rotas-list").props().selectedUsers).toEqual(new Set([1, 2]))
    expect(usersListComponent.props().users).toBe(rotaUsersMock.users)
  })
})
