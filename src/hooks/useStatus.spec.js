import { useStatus } from "@/hooks/useStatus"

describe("useStatus", () => {
  it("test useStatus flow", () => {
    const status = useStatus()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isLoading.value).toBe(false)

    status.statusLoading()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isLoading.value).toBe(true)

    status.statusSuccess()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(true)
    expect(status.isLoading.value).toBe(false)

    status.statusReset()
    expect(status.isError.value).toBe(false)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isLoading.value).toBe(false)

    status.statusError()
    expect(status.isError.value).toBe(true)
    expect(status.isSuccess.value).toBe(false)
    expect(status.isLoading.value).toBe(false)
  })
})
