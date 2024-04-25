<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DialogTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogTriggerProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.button v-bind="dialog.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
