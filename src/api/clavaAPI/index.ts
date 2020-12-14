import RotaService from "@/api/clavaAPI/rota"
import RotaUsersService from "@/api/clavaAPI/rotasUsers"
import { Api } from "@/api"
import { serviceCache } from "@/api/serviceCache"

export const clavaAPI = new Api(process.env.VUE_APP_CLAVA_API)

export const getRotaServices = () => serviceCache.loadInstance<RotaService>(RotaService, clavaAPI)
export const getRotasUsersServices = () => serviceCache.loadInstance<RotaUsersService>(RotaUsersService, clavaAPI)
