<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogTriggerBaseProps extends PolymorphicProps {}
export interface DialogTriggerProps
  extends DialogTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils'

defineProps<DialogTriggerProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="dialog.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
