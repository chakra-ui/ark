<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogBackdropProps extends PolymorphicProps, /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogBackdropProps>()
const dialog = useDialogContext()
const renderStrategy = useRenderStrategyProps()
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
