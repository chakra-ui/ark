<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DialogPositionerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogPositionerProps>()
const dialog = useDialogContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="dialog.positionerProps"
    :present="dialog.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
