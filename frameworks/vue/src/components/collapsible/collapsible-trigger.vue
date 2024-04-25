<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface CollapsibleTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useCollapsibleContext } from './use-collapsible-context'

defineProps<CollapsibleTriggerProps>()
const collapsible = useCollapsibleContext()
</script>

<template>
  <button v-bind="collapsible.triggerProps">
    <slot />
  </button>
</template>
