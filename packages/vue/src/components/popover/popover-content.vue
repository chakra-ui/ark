<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverContentBaseProps extends PolymorphicProps {}
export interface PopoverContentProps
  extends PopoverContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverContentProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
