<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseDialogReturn } from './use-dialog'

interface RootProviderProps {
  value: UnwrapRef<UseDialogReturn>
}

export interface DialogRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface DialogRootProviderProps extends DialogRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { DialogProvider } from './use-dialog-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DialogRootProviderProps>()
const dialog = computed(() => props.value)

DialogProvider(dialog)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
