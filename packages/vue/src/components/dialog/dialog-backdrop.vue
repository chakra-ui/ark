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
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { usePresence } from '../presence'
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogBackdropProps>()

const dialog = useDialogContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: dialog.value.open,
  })),
)

const mergedProps = computed(() => mergeProps(dialog.value.getBackdropProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
