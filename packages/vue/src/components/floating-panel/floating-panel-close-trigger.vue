<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelCloseTriggerProps
  extends FloatingPanelCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { useForwardExpose } from '../../utils'

defineProps<FloatingPanelCloseTriggerProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="floatingPanel.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
