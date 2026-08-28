<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseCollapsibleReturn } from './use-collapsible.ts'

interface RootProviderProps {
  value: UnwrapRef<UseCollapsibleReturn>
}

export interface CollapsibleRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CollapsibleRootProviderProps
  extends
    CollapsibleRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { CollapsibleProvider } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<CollapsibleRootProviderProps>()
const collapsible = computed(() => props.value)

CollapsibleProvider(collapsible)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="collapsible.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
