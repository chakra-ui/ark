<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './collapsible.types'

export interface CollapsibleRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface CollapsibleRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
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
