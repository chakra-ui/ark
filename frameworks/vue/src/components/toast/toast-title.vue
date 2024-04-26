<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ToastTitleProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastTitleProps>()
const toast = useToastContext()
</script>

<template>
  <ark.div v-bind="toast.titleProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
