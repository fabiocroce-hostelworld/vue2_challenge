import { useStatus } from "@/hooks/useStatus"

describe("useStatus", () => {
  it("test useStatus flow", () => {
    const status = useStatus()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isFetching.value).toBe(false)

    status.startFetching()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isFetching.value).toBe(true)

    status.fetchSuccess()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(true)
    expect(status.isFetching.value).toBe(false)

    status.resetFetch()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isFetching.value).toBe(false)

    status.fetchError()
    expect(status.isError.value).toBe(true)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isFetching.value).toBe(false)
  })
})
