<script lang="ts">
import type { BackdropState } from '@zag-js/dialog'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DialogBackdropState extends BackdropState {}
export interface DialogBackdropBaseProps extends PolymorphicProps {}
export interface DialogBackdropProps
  extends
    DialogBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { usePresence } from '../presence/index.ts'
import { ark } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'

defineProps<DialogBackdropProps>()

defineSlots<PolymorphicSlots<DialogBackdropState>>()

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
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="dialog.getBackdropState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
