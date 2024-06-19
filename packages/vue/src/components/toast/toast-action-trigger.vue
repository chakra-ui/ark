<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastActionTriggerBaseProps extends PolymorphicProps {}
export interface ToastActionTriggerProps
  extends ToastActionTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastActionTriggerProps>()
const toast = useToastContext()
</script>

<template>
  <ark.button v-bind="toast.getActionTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
