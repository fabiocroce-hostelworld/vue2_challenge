<template>
  <div>
    <v-alert v-for="(alert, idx) in alerts" :key="idx" dense text :type="alert.type" @click="clearAlert(idx)" dismissible>
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { AlertProvider, useAlert } from "@/providers/alertProvider"

export default Vue.extend({
  name: "Alert",
  setup() {
    const { alerts, clearAlert } = useAlert() as AlertProvider

    return {
      alerts,
      clearAlert
    }
  }
})
</script>
