<template>
  <v-sheet height="500">
    <v-calendar
      ref="calendar"
      :now="startDate"
      :start="startDate"
      :value="startDate"
      :events="events ? events.filter(rota => selectedUsers.has(rota.userId)) : []"
      color="primary"
      type="month"
      :event-color="getEventColor"
    />
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue"
import { usersTypes } from "@/store"
import { computed } from "@vue/composition-api"
import { ShiftTypes } from "@/api/clavaAPI/rota/RotasResponseDTO"
import { rotasTypes } from "@/store"
import { useStore, StoreProvider } from "@/providers/storeProvider"
import { Rotas } from "@/models"

export default Vue.extend({
  name: "RotasCalendar",
  props: {
    selectedUsers: {
      type: Set,
      required: true
    }
  },
  setup() {
    const { store, reactiveGetter } = useStore() as StoreProvider
    const rotas = reactiveGetter<Array<Rotas>>(rotasTypes.getters.GET_ROTAS)

    const getUserNameById = (userId: number) => store.getters[usersTypes.getters.GET_USER_NAME](userId)

    const startDate = computed(() => rotas.value[0]?.period.startDate)
    const events = computed(() => {
      return rotas.value.flatMap(thisRota =>
        thisRota.rota.map(({ date, userId, type }) => ({
          userId,
          name: getUserNameById(userId),
          ...(type === ShiftTypes.MORNING
            ? {
                start: `${date} 09:00`,
                end: `${date} 12:00`,
                color: "secondary"
              }
            : {
                start: `${date} 12:00`,
                end: `${date} 17:00`,
                color: "primary"
              })
        }))
      )
    })

    return {
      startDate,
      events,
      /* istanbul ignore next */
      getEventColor(event: { color: string }) {
        return event.color
      },
      rotas
    }
  }
})
</script>
