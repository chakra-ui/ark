<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverTitleBaseProps extends PolymorphicProps {}
export interface PopoverTitleProps
  extends PopoverTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverTitleProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="popover.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
