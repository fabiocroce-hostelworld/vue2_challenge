import { provide, inject, computed, ComputedRef } from "@vue/composition-api"
import store from "@/store"

export interface StoreProvider {
  store: typeof store
  reactiveGetter: <T>(name: string) => ComputedRef<T>
}

// Vuex adapter for composition API
export const setupStoreProvider = (localStore: typeof store): StoreProvider => ({
  store: localStore,
  reactiveGetter: <T>(getterName: string): ComputedRef<T> => {
    return computed(() => localStore.getters[getterName])
  }
})

export const storeRef = Symbol("vuex-store")
export const provideStore = /* istanbul ignore next */ () => provide(storeRef, setupStoreProvider(store))
export const useStore = () => inject<StoreProvider>(storeRef)
