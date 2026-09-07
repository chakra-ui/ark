<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { usePresenceContext } from '../presence/index.ts'
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
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
