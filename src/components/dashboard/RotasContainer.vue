<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" md="3">
        <users-list class="users-list" :users="users" @change="filterUsers($event, selectedUsers)" />
      </v-col>
      <v-col sm="12" md="9">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab>Calendar</v-tab>
            <v-tab>List</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="tab-calendar">
              <rotas-calendar class="rotas-calendar" :selected-users="selectedUsers.users" />
            </v-tab-item>
            <v-tab-item class="tab-list">
              <rotas-list class="rotas-list" :selected-users="selectedUsers.users" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        <br />
        <add-rota class="add-rota" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { usersTypes } from "@/store"
import { useStore } from "@/providers/storeProvider"
import { reactive, defineComponent, ref } from "@vue/composition-api"
import RotasCalendar from "@/components/dashboard/RotasCalendar.vue"
import UsersList from "@/components/dashboard/UsersList.vue"
import AddRota from "@/components/dashboard/AddRota.vue"
import { IUsersList } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"

export default defineComponent({
  name: "RotasDisplay",
  components: {
    RotasCalendar,
    UsersList,
    AddRota,
    RotasList: () => import("@/components/dashboard/RotasList.vue")
  },
  setup() {
    const { reactiveGetter } = useStore()!
    const selectedUsers = reactive<{ users: Set<number> }>({ users: new Set() })
    const tab = ref(0)

    const users = reactiveGetter<IUsersList>(usersTypes.getters.GET_USERS)

    const filterUsers = (updatedUsers: Array<number>, actualSelectedUsers: { users: Set<number> }) => {
      actualSelectedUsers.users = new Set([...updatedUsers])
    }

    return {
      users,
      selectedUsers,
      filterUsers,
      tab
    }
  }
})
</script>
