<script lang="ts">
import type { TriggerState } from '@zag-js/collapsible'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface CollapsibleTriggerState extends TriggerState {}
export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps
  extends
    CollapsibleTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CollapsibleTriggerProps>()

defineSlots<PolymorphicSlots<CollapsibleTriggerState>>()
const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="collapsible.getTriggerProps()" :state="collapsible.getTriggerState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
