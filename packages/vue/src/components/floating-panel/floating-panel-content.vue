<script lang="ts">
import type { ContentState } from '@zag-js/floating-panel'
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FloatingPanelContentState extends ContentState {}
export interface FloatingPanelContentBaseProps extends PolymorphicProps {}
export interface FloatingPanelContentProps
  extends
    FloatingPanelContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FloatingPanelContentProps>()

defineSlots<PolymorphicSlots<FloatingPanelContentState>>()

const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(floatingPanel.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="floatingPanel.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
