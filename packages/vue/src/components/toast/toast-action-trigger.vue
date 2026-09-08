<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ToastActionTriggerBaseProps extends PolymorphicProps {}
export interface ToastActionTriggerProps
  extends
    ToastActionTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ToastActionTriggerProps>()
const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="toast.getActionTriggerProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
