<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { TriggerProps, TriggerState } from '@zag-js/tabs'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface TabTriggerState extends TriggerState {}
export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TabTriggerProps
  extends
    TabTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTabsContext } from './use-tabs-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<TabTriggerProps>(), {
  disabled: undefined,
} satisfies BooleanDefaults<TriggerProps>)

defineSlots<PolymorphicSlots<TabTriggerState>>()
const tabs = useTabsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tabs.getTriggerProps(props)" :state="tabs.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
