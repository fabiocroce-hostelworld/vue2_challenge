import { provide, inject, reactive, computed, ComputedRef } from "@vue/composition-api"

export enum alertTypes {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}

interface Alert {
  type: alertTypes
  message: string
  timerId?: number | undefined
}

export interface AlertProvider {
  addErrorAlert: (message: string) => void
  addSuccessAlert: (message: string) => void
  clearAlerts: () => void
  clearAlert: (idx: number) => void
  alerts: ComputedRef<Alert[]>
}

type alertConfig = { timeout?: number }

// Store for alert messages
export const setupAlertProvider = (config: alertConfig = {}): NonNullable<AlertProvider> => {
  const alertsArray = reactive<{ alerts: Array<Alert> }>({ alerts: [] })

  const clearByTimerId = (removeTimerId: number) => {
    alertsArray.alerts = alertsArray.alerts.filter(({ timerId }) => timerId !== removeTimerId)
  }

  const addAlert = ({ message, type }: Alert) => {
    if (config.timeout) {
      const timerId = setTimeout(() => {
        clearByTimerId(timerId)
      }, config.timeout)

      alertsArray.alerts.push({ message, type, timerId })
      return
    }
    alertsArray.alerts.push({ message, type })
  }

  const addErrorAlert = (message: string) => addAlert({ message, type: alertTypes.ERROR })
  const addSuccessAlert = (message: string) => addAlert({ message, type: alertTypes.SUCCESS })

  const clearAlerts = () => void (alertsArray.alerts.length = 0)
  const clearAlert = (removeIdx: number) => {
    alertsArray.alerts = alertsArray.alerts.filter((_, idx) => removeIdx !== idx)
  }
  const alerts = computed(() => alertsArray.alerts)

  return {
    addErrorAlert,
    addSuccessAlert,
    clearAlerts,
    clearAlert,
    alerts
  }
}

export const alertRef = Symbol("alert")

export const provideAlert = /* istanbul ignore next */ (config: alertConfig = {}) =>
  provide(alertRef, setupAlertProvider(config))
export const useAlert = () => inject<AlertProvider>(alertRef)
