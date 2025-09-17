<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelBodyBaseProps extends PolymorphicProps {}
export interface FloatingPanelBodyProps
  extends FloatingPanelBodyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<FloatingPanelBodyProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="floatingPanel.getBodyProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
