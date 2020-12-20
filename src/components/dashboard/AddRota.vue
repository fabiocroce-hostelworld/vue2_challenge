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
          <v-date-picker v-model="date" :min="today" no-title @input="menu = false" />
        </v-menu>
        <v-btn :loading="isFetching" :disabled="isFetching" class="generate-route mr-4 primary" @click="handleClick(date)">
          Generate Route
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ref, defineComponent } from "@vue/composition-api"
import { useStore } from "@/providers/storeProvider"
import { rotasTypes } from "@/store"
import { useAlert } from "@/providers/alertProvider"
import { useFetch } from "@/hooks/complex/useFetch"

interface Props {
  today: string
}

export default defineComponent<Props>({
  name: "AddRota",
  props: {
    today: {
      type: String,
      required: false,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  setup({ today }) {
    const { store } = useStore()!
    const { addSuccessAlert, addErrorAlert } = useAlert()!
    const { fetchData, isFetching } = useFetch()

    const date = ref(today)
    const menu = ref(false)

    const handleClick = (selectedDate: string) => {
      fetchData(() => store.dispatch(rotasTypes.actions.GENERATE_ROTA, selectedDate))
        .then(() => void addSuccessAlert("Rota added succesfully."))
        .catch(() => void addErrorAlert("Could not add the rota for that date."))
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
