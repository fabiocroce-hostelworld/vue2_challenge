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

  it("Snapshot test", () => {
    const wrapper = shallowMount(RotasContainer, input)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("when change event emitted expect RotasDisplay to send selectedUsers to RotasCalendar", async () => {
    const wrapper = shallowMount(RotasContainer, input)
    const usersListComponent = wrapper.find("users-list-stub")

    expect(wrapper.find("rotas-calendar-stub").props().selectedUsers).toEqual(new Set())

    await usersListComponent.vm.$emit("change", [1, 2])

    expect(wrapper.find("rotas-calendar-stub").props().selectedUsers).toEqual(new Set([1, 2]))
    expect(usersListComponent.props().users).toBe(rotaUsersMock.users)
  })
})
