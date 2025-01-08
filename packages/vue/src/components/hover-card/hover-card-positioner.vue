<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface HoverCardPositionerBaseProps extends PolymorphicProps {}
export interface HoverCardPositionerProps
  extends HoverCardPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
imimport { useForwardExpose,useRenderStrategyProps } from '../../utils'
import { PresenceProvider,usePresence } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'
efineProps<HoverCardPositionerProps>()

const hoverCard = useHoverCardContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: hoverCard.value.open,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="hoverCard.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
