<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseDialogReturn } from './use-dialog'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

interface RootProviderProps {
  value: UnwrapRef<UseDialogReturn>
}

export interface DialogRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface DialogRootProviderProps extends DialogRootProviderBaseProps {}
export interface DialogRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { PresenceProvider, usePresence } from '../presence'
import { DialogProvider } from './use-dialog-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DialogRootProviderProps>()
const emits = defineEmits<DialogRootProviderEmits>()

const dialog = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: dialog.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
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
