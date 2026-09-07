<script lang="ts">
import type { TriggerState } from '@zag-js/floating-panel'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FloatingPanelTriggerState extends TriggerState {}
export interface FloatingPanelTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelTriggerProps
  extends
    FloatingPanelTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { usePresenceContext } from '../presence/index.ts'
import { computed } from 'vue'

defineProps<FloatingPanelTriggerProps>()

defineSlots<PolymorphicSlots<FloatingPanelTriggerState>>()
const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

const triggerProps = computed(() => {
  const localProps = floatingPanel.value.getTriggerProps()
  return {
    ...localProps,
    'aria-controls': presence.value.unmounted ? undefined : localProps['aria-controls'],
  }
})

useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild" :state="floatingPanel.getTriggerState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
