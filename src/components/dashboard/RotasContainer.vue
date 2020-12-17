<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" md="3">
        <users-list :users="users" @change="filterUsers($event, selectedUsers)" />
      </v-col>
      <v-col sm="12" md="9">
        <rotas-calendar :selected-users="selectedUsers.users" />
        <br />
        <add-rota />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { usersTypes } from "@/store"
import { StoreProvider, useStore } from "@/providers/storeProvider"
import { reactive, defineComponent } from "@vue/composition-api"
import RotasCalendar from "@/components/dashboard/RotasCalendar.vue"
import UsersList from "@/components/dashboard/UsersList.vue"
import AddRota from "@/components/dashboard/AddRota.vue"
import { IUsersList } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"

export default defineComponent({
  name: "RotasDisplay",
  components: {
    RotasCalendar,
    UsersList,
    AddRota
  },
  setup() {
    const { reactiveGetter } = useStore() as StoreProvider
    const selectedUsers = reactive<{ users: Set<number> }>({ users: new Set() })

    const users = reactiveGetter<IUsersList>(usersTypes.getters.GET_USERS)

    const filterUsers = (updatedUsers: Array<number>, actualSelectedUsers: { users: Set<number> }) => {
      actualSelectedUsers.users = new Set([...updatedUsers])
    }

    return {
      users,
      selectedUsers,
      filterUsers
    }
  }
})
</script>
