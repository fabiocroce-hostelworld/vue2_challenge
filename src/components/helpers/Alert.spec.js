import { shallowMount, createLocalVue } from "@vue/test-utils"
import Alert from "@/components/helpers/Alert"
import { setupAlertProvider, alertRef, alertTypes } from "@/providers/alertProvider"

const alertProvider = setupAlertProvider({})
alertProvider.addSuccessAlert({ message: "Successful" })
alertProvider.addErrorAlert({ message: "Error" })

describe("Alert", () => {
  let input
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()

    input = {
      localVue,
      provide: {
        [alertRef]: alertProvider
      }
    }
  })

  it("Snapshot test", () => {
    const wrapper = shallowMount(Alert, input)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("check for Alert component props", () => {
    const wrapper = shallowMount(Alert, input)

    const elements = wrapper.findAll(".alert")
    expect(elements.at(0).props().type).toBe(alertTypes.SUCCESS)

    expect(elements.at(1).props().type).toBe(alertTypes.ERROR)
  })

  it("Alert should disappear after being clicked", async () => {
    const wrapper = shallowMount(Alert, input)

    expect(alertProvider.alerts.value.length).toBe(2)

    await wrapper.find(".alert").vm.$emit("click")

    expect(alertProvider.alerts.value.length).toBe(1)
  })
})
