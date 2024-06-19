<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverArrowTipBaseProps extends PolymorphicProps {}
export interface PopoverArrowTipProps
  extends PopoverArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverArrowTipProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
