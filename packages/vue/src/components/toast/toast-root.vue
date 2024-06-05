<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToastRootProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastRootProps>()

const toast = useToastContext()
</script>

<template>
  <ark.div v-bind="toast.rootProps" :as-child="asChild">
    <div v-bind="toast.ghostBeforeProps" />
    <slot />
    <div v-bind="toast.ghostAfterProps" />
  </ark.div>
</template>
