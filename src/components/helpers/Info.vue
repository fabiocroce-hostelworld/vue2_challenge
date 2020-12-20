<template>
  <v-alert dense type="info">
    {{ message }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"

export default defineComponent<{ message: string }>({
  name: "Info",
  props: {
    message: {
      type: String,
      required: true
    }
  }
})
</script>
