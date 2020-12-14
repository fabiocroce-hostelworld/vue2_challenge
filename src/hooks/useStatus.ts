import { ref, ComputedRef } from "@vue/composition-api"

interface UseStatus {
  resetFetch: () => void
  startFetching: () => void
  fetchSuccess: () => void
  fetchError: () => void
  isError: ComputedRef<boolean>
  isFetching: ComputedRef<boolean>
  isSuccess: ComputedRef<boolean>
}

// Fetch status util hook
export const useStatus = (): UseStatus => {
  const isFetching = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)

  const resetFetch = () => {
    isFetching.value = false
    isSuccess.value = false
    isError.value = false
  }

  const startFetching = () => {
    isFetching.value = true
  }

  const fetchSuccess = () => {
    isSuccess.value = true
    isFetching.value = false
  }

  const fetchError = () => {
    isError.value = true
    isFetching.value = false
  }

  return {
    resetFetch,
    startFetching,
    fetchSuccess,
    fetchError,
    isFetching,
    isSuccess,
    isError
  }
}
