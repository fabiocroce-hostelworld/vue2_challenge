import { mount, createLocalVue } from "@vue/test-utils"
import UsersList from "@/components/dashboard/UsersList"
import rotaUsersMock from "@/api/clavaAPI/rotasUsers/rotasResponse.mock"

describe("UsersList - loaded users", () => {
  let input
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()

    input = {
      localVue,
      propsData: {
        users: rotaUsersMock.users
      }
    }
  })

  it("Snapshot test", () => {
    const wrapper = mount(UsersList, input)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it("Expect UsersList to emit selected users on clicking checkbox", () => {
    const wrapper = mount(UsersList, input)
    wrapper.findAll(".user-checkbox").at(0).find('[type="checkbox"]').trigger("click")

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual([1])
  })

  it("Expect UsersList to emit all selected users on clicking toggle get all shifts", () => {
    const wrapper = mount(UsersList, input)
    const toggleCheckBox = wrapper.find(".toggle-all")

    toggleCheckBox.trigger("click")

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    toggleCheckBox.trigger("click")

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[1][0]).toEqual([])
  })
})
