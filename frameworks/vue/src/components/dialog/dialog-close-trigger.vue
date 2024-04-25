<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DialogCloseTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogCloseTriggerProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.button v-bind="dialog.closeTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
