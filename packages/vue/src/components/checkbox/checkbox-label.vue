<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxLabelProps>()
const checkbox = useCheckboxContext()
</script>

<template>
  <ark.span v-bind="checkbox.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
