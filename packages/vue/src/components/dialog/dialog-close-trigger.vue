<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogCloseTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogCloseTriggerProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.button v-bind="dialog.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
