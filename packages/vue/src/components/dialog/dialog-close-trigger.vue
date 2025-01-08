<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogCloseTriggerBaseProps extends PolymorphicProps {}
export interface DialogCloseTriggerProps
  extends DialogCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils'

defineProps<DialogCloseTriggerProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="dialog.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
