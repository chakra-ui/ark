<script lang="ts">
import type { TriggerProps } from '@zag-js/dialog'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DialogTriggerProps
  extends
    DialogTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DialogTriggerProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="dialog.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
