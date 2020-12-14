<template>
  <v-app>
    <h1 class="primary--text">DASHBOARD</h1>
    <alert />
    <rotas-container v-if="isSuccess" />
    <v-progress-circular v-if="isFetching" :size="70" color="primary" indeterminate />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import RotasContainer from "@/components/dashboard/RotasContainer.vue"
import Alert from "@/components/helpers/Alert.vue"
import { rootTypes } from "@/store"
import { useStatus } from "@/hooks/useStatus"
import { StoreProvider, useStore } from "@/providers/storeProvider"
import { AlertProvider, useAlert } from "@/providers/alertProvider"

export default Vue.extend({
  name: "Dashboard",
  components: {
    RotasContainer,
    Alert
  },
  setup() {
    const { store } = useStore() as StoreProvider
    const { addSuccessAlert, addErrorAlert } = useAlert() as AlertProvider
    const { startFetching, fetchSuccess, isSuccess, isFetching } = useStatus()

    startFetching()

    store
      .dispatch(rootTypes.actions.FETCH_ROTAS_AND_USERS)
      .then(() => {
        addSuccessAlert("Rotas have been fetched successfully.")
        fetchSuccess()
      })
      .catch(() => void addErrorAlert("Could not fetch rotas."))

    return {
      isFetching,
      isSuccess
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
