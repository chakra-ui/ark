<script lang="ts">
import type { TriggerProps } from '@zag-js/dialog'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DialogTriggerProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="dialog.getTriggerProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
