<template>
  <dashboard />
</template>

<script lang="ts">
import Vue from "vue"
import Dashboard from "@/pages/Dashboard.vue"

export default Vue.extend({
  name: "App",
  components: {
    Dashboard
  }
})
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  background-color: #fffef2;
}
</style>
