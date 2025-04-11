<script lang="ts">
import type { ResizeTriggerProps } from '@zag-js/floating-panel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface FloatingPanelResizeTriggerProps
  extends FloatingPanelResizeTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<FloatingPanelResizeTriggerProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="floatingPanel.getResizeTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
