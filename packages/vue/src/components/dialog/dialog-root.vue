<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits, RootProps } from './dialog.types'

export interface DialogRootBaseProps extends RootProps, RenderStrategyProps {}
export interface DialogRootProps extends DialogRootBaseProps {}
export interface DialogRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PresenceProvider, usePresence } from '../presence'
import { useDialog } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

const props = withDefaults(defineProps<DialogRootProps>(), {
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  defaultOpen: undefined,
  modal: undefined,
  open: undefined,
  preventScroll: undefined,
  restoreFocus: undefined,
  trapFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<DialogRootEmits>()
const dialog = useDialog(props, emits)

const presence = usePresence(
  computed(() => ({
    present: dialog.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

DialogProvider(dialog)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
