<script lang="ts">
import type { TriggerState } from '@zag-js/select'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface SelectTriggerState extends TriggerState {}
export interface SelectTriggerBaseProps extends PolymorphicProps {}
export interface SelectTriggerProps
  extends
    SelectTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectTriggerProps>()

defineSlots<PolymorphicSlots<SelectTriggerState>>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="select.getTriggerProps()" :state="select.getTriggerState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
