<script lang="ts">
import type { RootState } from '@zag-js/toast'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ToastRootState extends RootState {}
export interface ToastRootBaseProps extends PolymorphicProps {}
export interface ToastRootProps
  extends
    ToastRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ToastRootProps>()

defineSlots<PolymorphicSlots<ToastRootState>>()

const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toast.getRootProps()" :state="toast.getRootState()" :as-child="asChild">
    <div v-bind="toast.getGhostBeforeProps()" />
    <slot />
    <div v-bind="toast.getGhostAfterProps()" />
  </ark.div>
</template>
