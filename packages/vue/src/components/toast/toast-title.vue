<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastTitleBaseProps extends PolymorphicProps {}
export interface ToastTitleProps
  extends ToastTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'
import { useForwardExpose } from '../../utils'

defineProps<ToastTitleProps>()
const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toast.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
