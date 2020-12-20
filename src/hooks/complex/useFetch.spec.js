import { useFetch } from "@/hooks/complex/useFetch"
import flushPromises from "flush-promises"

describe("useFetch", () => {
  it("test initial state", () => {
    const fetch = useFetch()
    expect(fetch.isError.value).toBe(false)
    expect(fetch.isSuccess.value).toBe(false)
    expect(fetch.isFetching.value).toBe(false)
  })

  it("test successfully fetch", async () => {
    const successfulPromise = jest.fn().mockResolvedValue()
    const fetch = useFetch()

    fetch.fetchData(successfulPromise)

    expect(fetch.isError.value).toBe(false)
    expect(fetch.isSuccess.value).toBe(false)
    expect(fetch.isFetching.value).toBe(true)

    await flushPromises()

    expect(fetch.isError.value).toBe(false)
    expect(fetch.isSuccess.value).toBe(true)
    expect(fetch.isFetching.value).toBe(false)
  })

  it("test exception fetch", async () => {
    const rejectedPromise = jest.fn().mockRejectedValue({ message: "error" })
    const fetch = useFetch()

    try {
      await fetch.fetchData(rejectedPromise)
    } catch {
      expect(fetch.isError.value).toBe(true)
      expect(fetch.isSuccess.value).toBe(false)
      expect(fetch.isFetching.value).toBe(false)
    }
  })
})
