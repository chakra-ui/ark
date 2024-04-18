<script setup lang="ts">
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export type CollapsibleRootEmits = {
  exitComplete: []
}
export interface CollapsibleRootProps extends Omit<UseCollapsibleProps, 'onExitComplete'> {}

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()
defineSlots<{
  default(): any
}>()

const collapsible = useCollapsible(props, emits)
CollapsibleProvider(collapsible)
</script>

<template>
  <div v-bind="collapsible.rootProps">
    <slot />
  </div>
</template>