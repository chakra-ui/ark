<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastDescriptionBaseProps extends PolymorphicProps {}
export interface ToastDescriptionProps
  extends ToastDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastDescriptionProps>()
const toast = useToastContext()
</script>

<template>
  <ark.div v-bind="toast.getDescriptionProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
