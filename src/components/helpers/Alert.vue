<template>
  <div>
    <v-alert
      v-for="(alert, idx) in alerts"
      :key="idx"
      dense
      text
      :type="alert.type"
      class="alert"
      dismissible
      @click="clearAlert(idx)"
    >
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { useAlert } from "@/providers/alertProvider"

export default defineComponent({
  name: "Alert",
  setup() {
    const { alerts, clearAlert } = useAlert()!

    return {
      alerts,
      clearAlert
    }
  }
})
</script>
