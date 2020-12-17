<template>
  <dashboard />
</template>

<script lang="ts">
import Dashboard from "@/pages/Dashboard.vue"
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "App",
  components: {
    Dashboard
  }
})
</script>

<style>
#app {
  padding: 20px;
}
</style>
