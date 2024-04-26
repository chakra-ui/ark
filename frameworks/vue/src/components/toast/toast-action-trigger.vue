<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ToastActionTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToastContext } from './use-toast-context'

defineProps<ToastActionTriggerProps>()
const toast = useToastContext()
</script>

<template>
  <ark.button v-bind="toast.actionTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
