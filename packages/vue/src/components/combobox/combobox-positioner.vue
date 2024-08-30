<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface ComboboxPositionerBaseProps extends PolymorphicProps {}
export interface ComboboxPositionerProps
  extends ComboboxPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxPositionerProps>()
const combobox = useComboboxContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: combobox.value.open,
  })),
)
PresenceProvider(presence)
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="combobox.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
