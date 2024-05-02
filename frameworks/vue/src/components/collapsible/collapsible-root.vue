<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './collapsible.types'

export interface CollapsibleRootProps extends RootProps, PolymorphicProps {}
export interface CollapsibleRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  defaultOpen: undefined,
  disabled: undefined,
  lazyMount: undefined,
  open: undefined,
  unmountOnExit: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<CollapsibleRootEmits>()

const collapsible = useCollapsible(props, emits)
CollapsibleProvider(collapsible)
</script>

<template>
  <ark.div v-bind="collapsible.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
