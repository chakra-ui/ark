<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseDrawerContext } from './use-drawer-context'

export interface DrawerContextProps extends SlotsType<{
  default: UnwrapRef<UseDrawerContext>
}> {}
</script>

<script setup lang="ts">
import { useDrawerContext } from './use-drawer-context'

const drawer = useDrawerContext()

defineSlots<{
  default(drawer: UnwrapRef<UseDrawerContext>): unknown
}>()
</script>

<template>
  <slot v-bind="drawer"></slot>
</template>
