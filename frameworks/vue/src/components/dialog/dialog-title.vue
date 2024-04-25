<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DialogTitleProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogTitleProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.h2 v-bind="dialog.titleProps" :as-child="asChild">
    <slot />
  </ark.h2>
</template>
