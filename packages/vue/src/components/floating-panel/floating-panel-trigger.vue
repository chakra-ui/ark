<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelTriggerProps
  extends FloatingPanelTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'
import { usePresenceContext } from '../presence'
import { computed } from 'vue'

defineProps<FloatingPanelTriggerProps>()
const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

const triggerProps = computed(() => ({
  ...floatingPanel.value.getTriggerProps(),
  'aria-controls': presence.value.unmounted ? undefined : floatingPanel.value.getTriggerProps()['aria-controls'],
}))

useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
