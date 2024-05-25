<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogContentProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogContentProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.div v-bind="dialog.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
