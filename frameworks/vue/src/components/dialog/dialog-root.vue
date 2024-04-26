<script lang="ts">
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './dialog.types'

export interface DialogRootProps extends RootProps, RenderStrategyProps {}
export interface DialogRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { useDialog } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

const props = withDefaults(defineProps<DialogRootProps>(), {
  defaultOpen: undefined,
  open: undefined,
})
const emits = defineEmits<DialogRootEmits>()

const dialog = useDialog(props, emits)

DialogProvider(dialog)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
