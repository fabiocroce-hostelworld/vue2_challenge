import Vue from "vue"
import App from "@/App.vue"
import store from "@/store"
import VueCompositionAPI from "@vue/composition-api"
import vuetify from "@/plugins/vuetify"
import { provideStore } from "@/providers/storeProvider"
import { provideAlert } from "@/providers/alertProvider"
import { ALERT_TIMEOUT } from "./config"

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  store,
  setup() {
    provideStore()
    provideAlert({ timeout: ALERT_TIMEOUT })
  },
  vuetify,
  render: h => h(App)
}).$mount("#app")
