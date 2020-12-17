import { IUsersList } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"
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
  users: IUsersList
}

export default {
  namespaced: true,
  state: (): UsersState => ({
    users: [] as IUsersList
  }),
  getters: {
    [types.getters.GET_USERS](state: UsersState) {
      return state.users
    },
    [types.getters.GET_MAPPED_USERS](state: UsersState) {
      return Object.assign({}, ...state.users.map(user => ({ [user.userId]: user.user })))
    },
    [types.getters.GET_USER_NAME](_: UsersState, getters: { [x: string]: IUsersList }) {
      return (userId: number) => getters[types.getters.GET_MAPPED_USERS][userId]
    }
  },
  mutations: {
    [types.mutations.STORE_USERS]: (state: UsersState, users: IUsersList) => {
      state.users = users
    }
  }
}
