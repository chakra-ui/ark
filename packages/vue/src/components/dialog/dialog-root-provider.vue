<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { UseDialogReturn } from './use-dialog'

interface RootProviderProps {
  value: UnwrapRef<UseDialogReturn>
}

export interface DialogRootProviderProps extends RootProviderProps, RenderStrategyProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { DialogProvider } from './use-dialog-context'

const props = defineProps<DialogRootProviderProps>()
const dialog = computed(() => props.value)

DialogProvider(dialog)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
