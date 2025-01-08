<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverIndicatorBaseProps extends PolymorphicProps {}
export interface PopoverIndicatorProps
  extends PopoverIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverIndicatorProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="popover.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
