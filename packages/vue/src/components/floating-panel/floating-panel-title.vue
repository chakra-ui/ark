<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FloatingPanelTitleBaseProps extends PolymorphicProps {}
export interface FloatingPanelTitleProps
  extends
    FloatingPanelTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

defineProps<FloatingPanelTitleProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="floatingPanel.getTitleProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.h2>
</template>
