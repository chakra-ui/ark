<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogContentBaseProps extends PolymorphicProps {}
export interface DialogContentProps
  extends DialogContentBaseProps,
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
  <ark.div v-bind="dialog.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
