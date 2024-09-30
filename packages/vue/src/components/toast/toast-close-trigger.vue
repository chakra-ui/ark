<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastCloseTriggerBaseProps extends PolymorphicProps {}
export interface ToastCloseTriggerProps
  extends ToastCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'
import { useForwardExpose } from '../../utils'

defineProps<ToastCloseTriggerProps>()
const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="toast.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
