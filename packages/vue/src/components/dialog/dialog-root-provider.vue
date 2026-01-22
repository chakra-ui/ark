<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { UseDialogReturn } from './use-dialog'
import type { UsePresenceProps } from '../presence'
import type { PresenceEmits } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'

interface RootProviderProps {
  value: UnwrapRef<UseDialogReturn>
}

export interface DialogRootProviderBaseProps extends RootProviderProps {}
export interface DialogRootProviderProps extends DialogRootProviderBaseProps, UsePresenceProps {}
</script>

<script setup lang="ts">
import { computed, mergeProps } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { DialogProvider } from './use-dialog-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DialogRootProviderProps>()
const emits = defineEmits<PresenceEmits>()
const dialog = computed(() => props.value)
const presence = usePresence(
  computed(() => {
    const [presenceProps] = splitPresenceProps(props)
    return mergeProps({ ...presenceProps }, { present: dialog.value.open })
  }),
  (evt, ..._) => emits(evt),
)

DialogProvider(dialog)
RenderStrategyPropsProvider(
  computed(() => ({
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>
