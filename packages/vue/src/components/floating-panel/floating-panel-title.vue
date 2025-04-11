<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelTitleBaseProps extends PolymorphicProps {}
export interface FloatingPanelTitleProps
  extends FloatingPanelTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

defineProps<FloatingPanelTitleProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="floatingPanel.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.h2>
</template>
