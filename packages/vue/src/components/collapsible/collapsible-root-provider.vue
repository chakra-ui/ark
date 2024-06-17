<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseCollapsibleReturn } from './use-collapsible'

interface RootProviderProps {
  value: UnwrapRef<UseCollapsibleReturn>
}

export interface CollapsibleRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CollapsibleRootProviderProps
  extends CollapsibleRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { CollapsibleProvider } from './use-collapsible-context'

const props = defineProps<CollapsibleRootProviderProps>()
const collapsible = computed(() => props.value)

CollapsibleProvider(collapsible)
</script>

<template>
  <ark.div v-bind="collapsible.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
