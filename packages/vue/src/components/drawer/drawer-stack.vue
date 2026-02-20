<script lang="ts">
export type DrawerStackProps = {}
</script>

<script setup lang="ts">
import * as drawer from '@zag-js/drawer'
import { normalizeProps } from '@zag-js/vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { DrawerStackProvider } from './use-drawer-stack-context'
import { provideDrawerStackStore } from './use-drawer-stack-store'

const stack = drawer.createStack()
provideDrawerStackStore(stack)

const snapshot = ref(stack.getSnapshot())
let unsubscribe: (() => void) | undefined

onMounted(() => {
  unsubscribe = stack.subscribe(() => {
    snapshot.value = stack.getSnapshot()
  })
})

onUnmounted(() => {
  unsubscribe?.()
})

const stackApi = computed(() => drawer.connectStack(snapshot.value, normalizeProps))
DrawerStackProvider(stackApi)
</script>

<template>
  <slot />
</template>
