import { setupAlertProvider, alertTypes } from "@/providers/alertProvider"

describe("alertProvider", () => {
  it("test alerts flow without timer", () => {
    const alertProvider = setupAlertProvider()
    expect(alertProvider.alerts.value).toEqual([])

    alertProvider.addErrorAlert("error message")
    expect(alertProvider.alerts.value).toEqual([{ message: "error message", type: alertTypes.ERROR }])

    alertProvider.addSuccessAlert("success message")
    expect(alertProvider.alerts.value).toEqual([
      { message: "error message", type: alertTypes.ERROR },
      { message: "success message", type: alertTypes.SUCCESS }
    ])

    alertProvider.clearAlert(0)
    expect(alertProvider.alerts.value).toEqual([{ message: "success message", type: alertTypes.SUCCESS }])

    alertProvider.clearAlerts()
    expect(alertProvider.alerts.value).toEqual([])
  })

  it("test alerts flow with timer", () => {
    jest.useFakeTimers()
    const alertProvider = setupAlertProvider({ timeout: 3000 })
    expect(alertProvider.alerts.value).toEqual([])

    alertProvider.addErrorAlert("error message")
    expect(alertProvider.alerts.value).toEqual([{ message: "error message", type: alertTypes.ERROR, timerId: 1 }])

    jest.runAllTimers()

    expect(alertProvider.alerts.value).toEqual([])
  })
})
