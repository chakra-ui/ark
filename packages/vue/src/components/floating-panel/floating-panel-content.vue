<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelContentBaseProps extends PolymorphicProps {}
export interface FloatingPanelContentProps
  extends FloatingPanelContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { usePresenceContext } from '../presence'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<FloatingPanelContentProps>()

const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(floatingPanel.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
