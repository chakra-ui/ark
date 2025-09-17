<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps {}
export interface CollapsibleIndicatorProps
  extends CollapsibleIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<CollapsibleIndicatorProps>()

const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="collapsible.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
