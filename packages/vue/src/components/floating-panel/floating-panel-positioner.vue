<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

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
