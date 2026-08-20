<script setup lang="ts">
import { type HotkeyStoreOptions, createHotkeyStore } from '@zag-js/hotkeys'
import { onMounted, onUnmounted, watch } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../environment/use-environment-context.ts'
import { HotkeyStoreContextProvider } from './use-hotkey-store.ts'

export interface HotkeysProviderProps extends Omit<HotkeyStoreOptions, 'target'> {}

const props = defineProps<HotkeysProviderProps>()

const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

const store = createHotkeyStore({
  activeScopes: props.activeScopes,
  conflictBehavior: props.conflictBehavior,
  defaultOptions: props.defaultOptions,
  sequenceTimeoutMs: props.sequenceTimeoutMs,
})

HotkeyStoreContextProvider(store)

onMounted(() => {
  store.init({ target: env.value.getRootNode() as Document, defaultOptions: props.defaultOptions })
})

onUnmounted(() => {
  store.destroy()
})

watch(
  () => (props.activeScopes === undefined ? '' : String(props.activeScopes)),
  () => {
    if (props.activeScopes === undefined) return
    store.setScope(props.activeScopes)
  },
)
</script>

<template>
  <slot></slot>
</template>
