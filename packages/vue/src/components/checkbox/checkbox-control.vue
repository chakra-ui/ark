<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxControlProps>()
const checkbox = useCheckboxContext()
</script>

<template>
  <ark.div v-bind="checkbox.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
