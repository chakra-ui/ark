<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface PopoverPositionerBaseProps extends PolymorphicProps {}
export interface PopoverPositionerProps
  extends PopoverPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps, useForwardExpose } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverPositionerProps>()

const popover = usePopoverContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: popover.value.open,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="popover.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
