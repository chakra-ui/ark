<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface CheckboxControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxControlProps>()
const attrs = useAttrs()
const checkbox = useCheckboxContext()

const controlProps = computed(() => ({
  ...attrs,
  ...checkbox.value.controlProps,
}))
</script>

<template>
  <ark.div v-bind="controlProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="checkbox.hiddenInputProps" />
</template>
