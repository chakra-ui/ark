<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastRootBaseProps extends PolymorphicProps {}
export interface ToastRootProps
  extends ToastRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'
import { useForwardExpose } from '../../utils'

defineProps<ToastRootProps>()

const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toast.getRootProps()" :as-child="asChild">
    <div v-bind="toast.getGhostBeforeProps()" />
    <slot />
    <div v-bind="toast.getGhostAfterProps()" />
  </ark.div>
</template>
