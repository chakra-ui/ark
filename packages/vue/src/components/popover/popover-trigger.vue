<script lang="ts">
import type { TriggerProps } from '@zag-js/popover'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface PopoverTriggerState {
  open: boolean
}
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
import { ark } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PopoverTriggerProps>()
defineSlots<PolymorphicSlots<PopoverTriggerState>>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="popover.getTriggerProps(props)" :as-child="asChild" :state="{ open: popover.open }">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
