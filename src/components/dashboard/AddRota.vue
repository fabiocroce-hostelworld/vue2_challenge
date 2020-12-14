<template>
  <v-card>
    <v-card-title> Add Route </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field label="From Date" prepend-icon="mdi-calendar" readonly :value="date" v-on="on" />
          </template>
          <v-date-picker :min="today" v-model="date" no-title @input="menu = false" />
        </v-menu>
        <v-btn :loading="isFetching" class="generate-route mr-4 primary" @click="handleClick(date)">
          Generate Route
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ref } from "@vue/composition-api"
import { StoreProvider, useStore } from "@/providers/storeProvider"
import { rotasTypes } from "@/store"
import { AlertProvider, useAlert } from "@/providers/alertProvider"
import { useStatus } from "@/hooks/useStatus"
import Vue from "vue"

export default Vue.extend({
  name: "AddRota",
  props: {
    today: {
      type: String,
      required: false,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  setup({ today }) {
    const { store } = useStore() as StoreProvider
    const { addSuccessAlert, addErrorAlert } = useAlert() as AlertProvider
    const { startFetching, resetFetch, isFetching } = useStatus()

    const date = ref(today)
    const menu = ref(false)

    const handleClick = async (selectedDate: string) => {
      startFetching()
      store
        .dispatch(rotasTypes.actions.GENERATE_ROTA, selectedDate)
        .then(() => void addSuccessAlert("Rota added succesfully."))
        .catch(() => void addErrorAlert("Could not add the rota for that date."))
        .finally(() => void resetFetch())
    }

    return {
      date: date.value,
      menu: menu.value,
      handleClick,
      isFetching
    }
  }
})
</script>
