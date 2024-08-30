<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface SelectPositionerBaseProps extends PolymorphicProps {}
export interface SelectPositionerProps
  extends SelectPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { useSelectContext } from './use-select-context'

defineProps<SelectPositionerProps>()
const select = useSelectContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: select.value.open,
  })),
)
PresenceProvider(presence)
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="select.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

