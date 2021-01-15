<template>
  <v-card>
    <v-card-title> Users </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-group v-model="selectedUsers.users" multiple @change="handleChange(selectedUsers)">
          <template v-for="(user, i) in users">
            <v-list-item :key="i" :value="user.userId" active-class="primary--text">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="user.user"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox :input-value="active" color="primary" class="user-checkbox" />
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
        <v-divider class="mb-4" />
        <v-btn class="toggle-all mr-4 primary" @click="toggleAll(users, selectedUsers)">
          Toggle all shifts
        </v-btn>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { reactive, defineComponent, PropType } from "@vue/composition-api"
import { User } from "@/models"
import { IUsersList } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"

type SelectedUsers = { users: Array<number> }

interface Props {
  users: IUsersList
}

export default defineComponent<Props>({
  name: "UsersList",
  props: {
    users: {
      type: Array as PropType<IUsersList>,
      required: true,
      validator: (prop: IUsersList) => prop.every(user => user instanceof User)
    }
  },
  setup(_, { emit }) {
    const selectedUsers = reactive<SelectedUsers>({ users: [] })

    const handleChange = (currentSelectedUsers: SelectedUsers) => {
      emit("change", currentSelectedUsers.users)
    }

    const toggleAll = (users: IUsersList, currentSelectedUsers: SelectedUsers) => {
      currentSelectedUsers.users = currentSelectedUsers.users.length ? [] : users.map(user => user.userId)
      emit("change", currentSelectedUsers.users)
    }

    return {
      selectedUsers,
      handleChange,
      toggleAll
    }
  }
})
</script>
