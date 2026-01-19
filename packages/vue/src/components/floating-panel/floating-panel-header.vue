<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelHeaderBaseProps extends PolymorphicProps {}
export interface FloatingPanelHeaderProps
  extends
    FloatingPanelHeaderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<FloatingPanelHeaderProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="floatingPanel.getHeaderProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
