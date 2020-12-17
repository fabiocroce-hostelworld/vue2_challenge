<template>
  <v-sheet height="500">
    <v-calendar
      ref="calendar"
      :now="startDate"
      :start="startDate"
      :value="startDate"
      :events="selectedEvents"
      color="primary"
      type="month"
      :event-color="getEventColor"
    />
  </v-sheet>
</template>

<script lang="ts">
import { usersTypes } from "@/store"
import { computed, defineComponent, PropType, reactive } from "@vue/composition-api"
import { ShiftTypes } from "@/api/clavaAPI/rota/RotasResponseDTO"
import { rotasTypes } from "@/store"
import { useStore, StoreProvider } from "@/providers/storeProvider"
import { IRotasList } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"

interface Props {
  selectedUsers: Set<number>
}

export default defineComponent<Props>({
  name: "RotasCalendar",
  props: {
    selectedUsers: {
      type: Set as PropType<Set<number>>,
      required: true
    }
  },
  setup(props) {
    const { store, reactiveGetter } = useStore() as StoreProvider
    const rotas = reactiveGetter<IRotasList>(rotasTypes.getters.GET_ROTAS)
    const reactiveUsers = reactive(props)

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

    const selectedEvents = computed(() => events.value.filter(rota => reactiveUsers.selectedUsers.has(rota.userId)))

    return {
      startDate,
      selectedEvents,
      /* istanbul ignore next */
      getEventColor(event: { color: string }) {
        return event.color
      },
      rotas
    }
  }
})
</script>
