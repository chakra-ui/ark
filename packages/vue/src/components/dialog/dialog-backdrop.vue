<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogBackdropBaseProps extends PolymorphicProps {}
export interface DialogBackdropProps
  extends DialogBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
    v-bind="dialog.getBackdropProps()"
    :present="dialog.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
