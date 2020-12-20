import { shallowMount, createLocalVue } from "@vue/test-utils"
import Info from "@/components/helpers/Info.vue"

describe("Info", () => {
  it("Snapshot test", () => {
    const wrapper = shallowMount(Info, {
      localVue: createLocalVue(),
      propsData: {
        message: "test"
      }
    })
    expect(wrapper.findAll(".info").length).toBe(0)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
