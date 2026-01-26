<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FloatingPanelPositionerBaseProps extends PolymorphicProps {}
export interface FloatingPanelPositionerProps
  extends
    FloatingPanelPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useFloatingPanelContext } from './use-floating-panel-context'

defineProps<FloatingPanelPositionerProps>()

const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="floatingPanel.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
