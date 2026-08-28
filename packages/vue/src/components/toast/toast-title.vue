<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ToastTitleBaseProps extends PolymorphicProps {}
export interface ToastTitleProps
  extends
    ToastTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ToastTitleProps>()
const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toast.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
