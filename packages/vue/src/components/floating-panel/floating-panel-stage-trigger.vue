<script lang="ts">
import type { StageTriggerProps, StageTriggerState } from '@zag-js/floating-panel'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FloatingPanelStageTriggerState extends StageTriggerState {}
export interface FloatingPanelStageTriggerBaseProps extends StageTriggerProps, PolymorphicProps {}
export interface FloatingPanelStageTriggerProps
  extends
    FloatingPanelStageTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

const props = defineProps<FloatingPanelStageTriggerProps>()

defineSlots<PolymorphicSlots<FloatingPanelStageTriggerState>>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.button
    v-bind="floatingPanel.getStageTriggerProps(props)"
    :state="floatingPanel.getStageTriggerState(props)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
