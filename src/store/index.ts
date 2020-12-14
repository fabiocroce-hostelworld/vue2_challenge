import { getRotasUsersServices } from "@/api/clavaAPI"
import Vue from "vue"
import Vuex, { Store } from "vuex"
import rotas, { rotasTypes } from "@/store/rotas"
import users, { usersTypes } from "@/store/users"

Vue.use(Vuex)

export const rootTypes = {
  actions: {
    FETCH_ROTAS_AND_USERS: "fetchRotasAndUsers"
  }
}

export { rotasTypes, usersTypes }

export const storeConfig = {
  modules: {
    rotas,
    users
  },
  actions: {
    [rootTypes.actions.FETCH_ROTAS_AND_USERS]: async ({ commit }: { commit: Function }) => {
      const { users, rotas } = await getRotasUsersServices().fetchUsersAndRotas()

      commit(rotasTypes.mutations.STORE_ROTAS, rotas)
      commit(usersTypes.mutations.STORE_USERS, users)
    }
  }
}

export default new Store(storeConfig)
