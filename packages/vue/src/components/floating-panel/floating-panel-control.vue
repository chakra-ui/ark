<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelControlBaseProps extends PolymorphicProps {}
export interface FloatingPanelControlProps
  extends FloatingPanelControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<FloatingPanelControlProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="floatingPanel.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
