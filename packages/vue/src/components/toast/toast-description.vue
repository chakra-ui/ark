<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ToastDescriptionProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastDescriptionProps>()
const toast = useToastContext()
</script>

<template>
  <ark.div v-bind="toast.descriptionProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
