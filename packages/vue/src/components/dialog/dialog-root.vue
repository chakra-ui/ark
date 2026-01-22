<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './dialog.types'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'

export interface DialogRootBaseProps extends RootProps, /* @vue-ignore */ UsePresenceProps {}
export interface DialogRootProps extends DialogRootBaseProps {}
export interface DialogRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, mergeProps } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
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
DialogProvider(dialog)

RenderStrategyPropsProvider(
  computed(() => ({
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
)

const presence = usePresence(
  computed(() => {
    const [presenceProps] = splitPresenceProps(props)
    return mergeProps({ ...presenceProps }, { present: dialog.value.open })
  }),
  (evt, ..._) => emits(evt),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>
