import { Api } from "@/api"

const route = "route"

describe("api", () => {
  let myApi

  beforeEach(() => {
    myApi = new Api("www.baseurl.com")
  })

  it("test get", () => {
    myApi.api.get = jest.fn()

    myApi.get(route)
    expect(myApi.api.get).toHaveBeenCalledWith("www.baseurl.com/" + route, {})

    myApi.get(route, { test: "a" })
    expect(myApi.api.get).toHaveBeenCalledWith("www.baseurl.com/" + route, { params: { test: "a" } })
  })
})
