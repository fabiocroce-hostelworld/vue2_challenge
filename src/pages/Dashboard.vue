<template>
  <v-app>
    <h1 class="primary--text">DASHBOARD</h1>
    <alert v-if="alerts.length" class="alerts" />
    <rotas-container v-if="isSuccess" class="rotas-container" />
    <v-progress-circular v-else :size="70" color="primary" indeterminate />
  </v-app>
</template>

<script lang="ts">
import RotasContainer from "@/components/dashboard/RotasContainer.vue"
import Alert from "@/components/helpers/Alert.vue"
import { rootTypes } from "@/store"
import { useFetch } from "@/hooks/complex/useFetch"
import { useStore } from "@/providers/storeProvider"
import { useAlert } from "@/providers/alertProvider"
import { defineComponent, onMounted } from "@vue/composition-api"

export default defineComponent({
  name: "Dashboard",
  components: {
    RotasContainer,
    Alert
  },
  setup() {
    const { store } = useStore()!
    const { addSuccessAlert, addErrorAlert, alerts } = useAlert()!
    const { fetchData, isSuccess } = useFetch()

    onMounted(() => {
      fetchData(() => store.dispatch(rootTypes.actions.FETCH_ROTAS_AND_USERS))
        .then(() => void addSuccessAlert("Rotas have been fetched successfully."))
        .catch(() => void addErrorAlert("Could not fetch rotas."))
    })

    return {
      isSuccess,
      alerts: alerts.value
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
