<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelCloseTriggerProps
  extends
    FloatingPanelCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FloatingPanelCloseTriggerProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="floatingPanel.getCloseTriggerProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
