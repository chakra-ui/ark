<script lang="ts">
import type { ControlState } from '@zag-js/floating-panel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FloatingPanelControlState extends ControlState {}
export interface FloatingPanelControlBaseProps extends PolymorphicProps {}
export interface FloatingPanelControlProps
  extends
    FloatingPanelControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FloatingPanelControlProps>()

defineSlots<PolymorphicSlots<FloatingPanelControlState>>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="floatingPanel.getControlProps()" :state="floatingPanel.getControlState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
