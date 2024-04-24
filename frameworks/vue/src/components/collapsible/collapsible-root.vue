<script lang="ts">
import type { RootEmits, RootProps } from './collapsible.types'

export interface CollapsibleRootProps extends RootProps, PolimoprhicProps {}
export interface CollapsibleRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

const props = withDefaults(defineProps<CollapsibleRootProps>(), { open: undefined })
const emits = defineEmits<CollapsibleRootEmits>()

const collapsible = useCollapsible(props, emits)
CollapsibleProvider(collapsible)
</script>

<template>
  <ark.div v-bind="collapsible.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
