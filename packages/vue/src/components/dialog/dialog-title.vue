<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogTitleBaseProps extends PolymorphicProps {}
export interface DialogTitleProps
  extends DialogTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils'

defineProps<DialogTitleProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="dialog.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.h2>
</template>
