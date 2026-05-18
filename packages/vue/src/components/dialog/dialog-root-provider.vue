<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { UseDialogReturn } from './use-dialog.ts'
import type { RootEmits as PresenceEmits } from '../presence/presence.types.ts'

interface RootProviderProps {
  value: UnwrapRef<UseDialogReturn>
}

export interface DialogRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface DialogRootProviderProps extends DialogRootProviderBaseProps {}
export interface DialogRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { DialogProvider } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

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
