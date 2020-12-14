import { User } from "@/models/User"
import { addNamespacePrefix } from "@/utils/vuexHelpers"

const types = {
  getters: {
    GET_USERS: "getUsers",
    GET_MAPPED_USERS: "getMappedUsers",
    GET_USER_NAME: "getUserName"
  },
  mutations: {
    STORE_USERS: "STORE_USERS"
  },
  actions: {
    FETCH_USERS: "fetchUsers"
  }
}

export const usersTypes = addNamespacePrefix(types, "users")

type UsersState = {
  users: Array<User>
}

export default {
  namespaced: true,
  state: (): UsersState => ({
    users: [] as Array<User>
  }),
  getters: {
    [types.getters.GET_USERS](state: UsersState) {
      return state.users
    },
    [types.getters.GET_MAPPED_USERS](state: UsersState) {
      return Object.assign({}, ...state.users.map(user => ({ [user.userId]: user.user })))
    },
    [types.getters.GET_USER_NAME](_: UsersState, getters: { [x: string]: Array<User> }) {
      return (userId: number) => getters[types.getters.GET_MAPPED_USERS][userId]
    }
  },
  mutations: {
    [types.mutations.STORE_USERS]: (state: UsersState, users: Array<User>) => {
      state.users = users
    }
  }
}
