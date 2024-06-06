<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogTriggerProps>()
const dialog = useDialogContext()
</script>

<template>
  <ark.button v-bind="dialog.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
