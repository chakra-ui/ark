<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { useRenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'

export interface DialogPositionerBaseProps extends PolymorphicProps {}
export interface DialogPositionerProps
  extends DialogPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { PresenceProvider,usePresence } from '../presence'
import { useDialogContext } from './use-dialog-context'
defineProps<DialogPositionerProps>()

const dialog = useDialogContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: dialog.value.open,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="dialog.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
