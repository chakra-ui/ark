<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ToastDescriptionBaseProps extends PolymorphicProps {}
export interface ToastDescriptionProps
  extends
    ToastDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ToastDescriptionProps>()
const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toast.getDescriptionProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
