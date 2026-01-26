<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelTriggerProps
  extends
    FloatingPanelTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { usePresenceContext } from '../presence'
import { computed } from 'vue'

defineProps<FloatingPanelTriggerProps>()
const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

const triggerProps = computed(() => {
  const localProps = floatingPanel.value.getTriggerProps()
  return {
    ...localProps,
    'aria-controls': presence.value.unmounted ? undefined : localProps['aria-controls'],
  }
})

useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
