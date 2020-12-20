<template>
  <v-card>
    <v-expansion-panels v-if="selectedEvents.length" multiple accordion class="m-4">
      <v-expansion-panel v-for="(events, idx) in selectedEvents" :key="idx" class="rota-dates px-5" expand>
        <v-expansion-panel-header class="rota-date"> {{ events[0] }}</v-expansion-panel-header>
        <v-expansion-panel-content v-if="events[1][ShiftTypes.MORNING] && selectedUsers.has(events[1][ShiftTypes.MORNING])">
          <v-chip class="secondary mr-2">Morning</v-chip
          ><span class="morning">{{ getUserNameById(events[1][ShiftTypes.MORNING]) }}</span>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          v-if="events[1][ShiftTypes.AFTERNOON] && selectedUsers.has(events[1][ShiftTypes.AFTERNOON])"
        >
          <v-chip class="primary mr-2">Afternoon</v-chip
          ><span class="afternoon">{{ getUserNameById(events[1][ShiftTypes.AFTERNOON]) }}</span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <info v-else class="info" message="Select users to display the shifts" />
  </v-card>
</template>

<script lang="ts">
import { usersTypes } from "@/store"
import { computed, defineComponent, PropType } from "@vue/composition-api"
import { rotasTypes } from "@/store"
import { useStore } from "@/providers/storeProvider"
import { IRota, ShiftTypes } from "@/api/clavaAPI/rota/RotasResponseDTO"
import { IRotasList } from "@/api/clavaAPI/rotasUsers/RotasResponseDTO"
import Info from "@/components/helpers/Info.vue"

interface Props {
  selectedUsers: Set<number>
}

type MappedDay = {
  [type in ShiftTypes]?: number
}

type MappedRota = Record<string, MappedDay>

type MappedEvents = Array<[string, MappedDay]>

export default defineComponent<Props>({
  name: "RotasList",
  components: {
    Info
  },
  props: {
    selectedUsers: {
      type: Set as PropType<Set<number>>,
      required: true
    }
  },
  setup(props) {
    const { store, reactiveGetter } = useStore()!
    const rotas = reactiveGetter<IRotasList>(rotasTypes.getters.GET_ROTAS)

    const getUserNameById = (userId: number) => store.getters[usersTypes.getters.GET_USER_NAME](userId)

    const mappedEvents = computed<MappedEvents>(() => {
      return rotas.value.flatMap(thisRota =>
        Object.entries(
          thisRota.rota.reduce((acc: MappedRota, { date, userId, type }: IRota) => {
            acc[date] = acc[date] ?? {}

            acc[date][type] = userId

            return acc
          }, {})
        )
      )
    })

    const selectedEvents = computed(() =>
      mappedEvents.value.filter(mappedEvent => {
        const mornminguser = mappedEvent[1][ShiftTypes.MORNING]
        const afternoonUser = mappedEvent[1][ShiftTypes.AFTERNOON]

        return (
          (mornminguser && props.selectedUsers.has(mornminguser)) ||
          (afternoonUser && props.selectedUsers.has(afternoonUser))
        )
      })
    )

    return {
      selectedEvents,
      getUserNameById,
      ShiftTypes
    }
  }
})
</script>
