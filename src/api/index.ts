import { API_DEFAULT_TIMEOUT } from "@/config"
import axios, { AxiosInstance } from "axios"

type FormattedResponse<T> = { data: T; status: number }

// Abstraction of axios, implement here the HTTP Verbs
class Api {
  private api: AxiosInstance
  #defaultHeaders: Record<string, string>
  #url: string

  constructor(url: string, headers = {}, timeout = API_DEFAULT_TIMEOUT) {
    this.api = axios.create({
      baseURL: url,
      timeout
    })
    this.#url = url
    this.#defaultHeaders = headers
  }

  async get<T>(path: string, query?: unknown, headers = {}): Promise<FormattedResponse<T>> {
    if (query) {
      return await this.api.get(`${this.#url}/${path}`, {
        params: query,
        ...headers,
        ...this.#defaultHeaders
      })
    }
    return await this.api.get(`${this.#url}/${path}`, headers)
  }
}

export { Api }
