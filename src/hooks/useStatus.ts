import { ref } from "@vue/composition-api"

// Generic status util hook
export const useStatus = () => {
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)

  const statusReset = () => {
    isLoading.value = false
    isSuccess.value = false
    isError.value = false
  }

  const statusLoading = () => {
    isLoading.value = true
    isSuccess.value = false
    isError.value = false
  }

  const statusSuccess = () => {
    isSuccess.value = true
    isLoading.value = false
  }

  const statusError = () => {
    isError.value = true
    isLoading.value = false
  }

  return {
    statusReset,
    statusLoading,
    statusSuccess,
    statusError,
    isLoading,
    isSuccess,
    isError
  }
}
