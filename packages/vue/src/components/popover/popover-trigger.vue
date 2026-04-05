<script lang="ts">
import type { TriggerProps } from '@zag-js/popover'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface PopoverTriggerProps
  extends
    PopoverTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<PopoverTriggerProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="popover.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
