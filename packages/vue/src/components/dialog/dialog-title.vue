<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogTitleProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
