<template>
  <v-card>
    <v-card-title> Users </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-group v-model="selectedUsers.users" multiple @change="handleChange(selectedUsers)">
          <template v-for="(item, i) in users">
            <v-list-item :key="`item-${i}`" :value="item.userId" active-class="primary--text">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.user"></v-list-item-title>
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
import Vue from "vue"
import { reactive } from "@vue/composition-api"
import { User } from "@/models"

type Users = Array<User>
type SelectedUsers = { users: Array<number> }

export default Vue.extend({
  name: "UsersList",
  props: {
    users: {
      type: Array,
      required: true,
      validator: (prop: Users) => prop.every((user: User) => user instanceof User)
    }
  },
  setup(_, { emit }) {
    const selectedUsers = reactive<SelectedUsers>({ users: [] })

    const handleChange = (currentSelectedUsers: SelectedUsers) => {
      emit("change", currentSelectedUsers.users)
    }

    const toggleAll = (users: Users, currentSelectedUsers: SelectedUsers) => {
      currentSelectedUsers.users = currentSelectedUsers.users.length ? [] : users.map((user: User) => user.userId)
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
