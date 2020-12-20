import { ref } from "@vue/composition-api"
import { useStatus } from "@/hooks/useStatus"

// fetcher: (key) => Promise<any> = (url) => fetch(url).then((res) => res.json())

export const useFetch = () => {
  const data = ref<unknown>(null)
  const error = ref<string | null>(null)
  const { statusLoading, statusSuccess, statusError, isSuccess, isLoading, isError } = useStatus()

  const fetchData = async <T>(callbackFetch: () => Promise<T>) => {
    statusLoading()
    try {
      const response = await callbackFetch()
      statusSuccess()
      data.value = response

      return Promise.resolve()
    } catch ({ message }) {
      statusError()
      error.value = message

      return Promise.reject()
    }
  }

  return {
    fetchData,
    data,
    error,
    isSuccess,
    isError,
    isFetching: isLoading
  }
}
