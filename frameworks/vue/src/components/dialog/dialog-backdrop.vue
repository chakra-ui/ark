<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DialogBackdropProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogBackdropProps>()
const dialog = useDialogContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="dialog.backdropProps"
    :present="dialog.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
