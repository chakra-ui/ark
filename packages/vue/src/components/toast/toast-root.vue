<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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

const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="asChild" v-bind="toast.getRootProps()" as-child>
    <slot />
  </ark.div>
  <ark.div v-else v-bind="toast.getRootProps()">
    <div v-bind="toast.getGhostBeforeProps()" />
    <slot />
    <div v-bind="toast.getGhostAfterProps()" />
  </ark.div>
</template>
