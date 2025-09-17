<script lang="ts">
import type { StageTriggerProps } from '@zag-js/floating-panel'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelStageTriggerBaseProps extends StageTriggerProps, PolymorphicProps {}
export interface FloatingPanelStageTriggerProps
  extends FloatingPanelStageTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

const props = defineProps<FloatingPanelStageTriggerProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="floatingPanel.getStageTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
