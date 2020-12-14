import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { storeConfig, rotasTypes, usersTypes } from "@/store"
import RotasCalendar from "@/components/dashboard/RotasCalendar"
import rotaUsersMock from "@/api/clavaAPI/rotasUsers/rotasResponse.mock"
import { setupStoreProvider, storeRef } from "@/providers/storeProvider"

describe("RotasCalendar - loaded rotas", () => {
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
    const wrapper = shallowMount(RotasCalendar, input)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("expects events to be empty if selectedUsers has no user ids", () => {
    input.propsData = {
      selectedUsers: new Set()
    }
    const wrapper = shallowMount(RotasCalendar, input)

    const calendar = wrapper.find("v-calendar-stub")
    const props = calendar.props()

    expect(props.now).toBe("2020-11-01")
    expect(props.events).toEqual([])
  })

  it("expects events not to be empty if selectedUsers has a userID (Titan Cox)", () => {
    input.propsData = {
      selectedUsers: new Set([5])
    }
    const wrapper = shallowMount(RotasCalendar, input)

    const calendar = wrapper.find("v-calendar-stub")
    const props = calendar.props()

    expect(props.now).toBe("2020-11-01")
    expect(props.events).toEqual([
      { color: "secondary", end: "2020-11-05 12:00", name: "Titan Cox", start: "2020-11-05 09:00", userId: 5 },
      { color: "primary", end: "2020-11-14 17:00", name: "Titan Cox", start: "2020-11-14 12:00", userId: 5 },
      { color: "secondary", end: "2020-11-16 12:00", name: "Titan Cox", start: "2020-11-16 09:00", userId: 5 }
    ])
  })
})

describe("RotasCalendar - no loaded rotas", () => {
  it("expects events to be empty if rotas are not loaded", () => {
    const localVue = createLocalVue()
    const store = new Vuex.Store(storeConfig)
    const input = {
      localVue,
      provide: {
        [storeRef]: setupStoreProvider(store)
      }
    }
    input.propsData = {
      selectedUsers: new Set()
    }
    const wrapper = shallowMount(RotasCalendar, input)

    const calendar = wrapper.find("v-calendar-stub")
    const props = calendar.props()

    expect(props.now).toBe(undefined)
    expect(props.events).toEqual([])
  })
})
