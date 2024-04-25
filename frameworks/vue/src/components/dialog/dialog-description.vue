<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DialogDescriptionProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogDescriptionProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.p v-bind="dialog.descriptionProps" :as-child="asChild">
    <slot />
  </ark.p>
</template>
