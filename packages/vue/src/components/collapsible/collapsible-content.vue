<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps
  extends CollapsibleContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

defineProps<CollapsibleContentProps>()
const collapsible = useCollapsibleContext()
</script>

<template>
  <ark.div v-if="!collapsible.unmounted" v-bind="collapsible.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
