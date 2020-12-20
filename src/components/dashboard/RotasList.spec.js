import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { storeConfig, rotasTypes, usersTypes } from "@/store"
import RotasList from "@/components/dashboard/RotasList"
import rotaUsersMock from "@/api/clavaAPI/rotasUsers/rotasResponse.mock"
import { setupStoreProvider, storeRef } from "@/providers/storeProvider"

describe("RotasList", () => {
  let input
  let localVue
  let store

  beforeEach(() => {
    localVue = createLocalVue()
    store = new Vuex.Store(storeConfig)

    store.commit(rotasTypes.mutations.STORE_ROTAS, rotaUsersMock.rotas)
    store.commit(usersTypes.mutations.STORE_USERS, rotaUsersMock.users)

    input = {
      localVue,
      provide: {
        [storeRef]: setupStoreProvider(store)
      }
    }
  })

  it("Snapshot test", () => {
    input.propsData = {
      selectedUsers: new Set([2, 3])
    }
    const wrapper = shallowMount(RotasList, input)
    expect(wrapper.findAll(".info").length).toBe(0)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("Snapshot test - with warning empty users", () => {
    input.propsData = {
      selectedUsers: new Set()
    }
    const wrapper = shallowMount(RotasList, input)
    expect(wrapper.findAll(".info").length).toBe(1)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("expects events to be empty if selectedUsers has no user ids", () => {
    input.propsData = {
      selectedUsers: new Set()
    }
    const wrapper = shallowMount(RotasList, input)

    const panel = wrapper.findAll(".rota-dates")

    expect(panel.length).toEqual(0)
  })

  it("expects events not to be empty if selectedUsers has a userID (Titan Cox)", () => {
    input.propsData = {
      selectedUsers: new Set([5])
    }
    const wrapper = shallowMount(RotasList, input)

    const panel = wrapper.findAll(".rota-dates")

    expect(panel.length).toEqual(3)

    expect(panel.at(0).find(".rota-date").text()).toBe("2020-11-05")
    expect(panel.at(0).find(".morning").text()).toBe("Titan Cox")
    expect(panel.at(0).findAll(".afternoon").length).toBe(0)

    expect(panel.at(1).find(".rota-date").text()).toBe("2020-11-14")
    expect(panel.at(1).find(".afternoon").text()).toBe("Titan Cox")
    expect(panel.at(1).findAll(".morning").length).toBe(0)

    expect(panel.at(2).find(".rota-date").text()).toBe("2020-11-16")
    expect(panel.at(2).find(".morning").text()).toBe("Titan Cox")
    expect(panel.at(2).findAll(".afternoon").length).toBe(0)
  })
})
