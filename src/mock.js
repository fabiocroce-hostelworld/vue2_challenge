import { clavaAPI } from "@/api/clavaAPI"

clavaAPI.api.get = jest.fn()

export const mockAxiosGet = clavaAPI.api.get
