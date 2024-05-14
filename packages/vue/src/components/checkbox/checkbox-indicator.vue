<script lang="ts">
import { computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxIndicatorProps extends PolymorphicProps {
  indeterminate?: boolean
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

const props = defineProps<CheckboxIndicatorProps>()
const checkbox = useCheckboxContext()
const isHidden = computed(() =>
  props.indeterminate ? checkbox.value.indeterminate : checkbox.value.checked,
)
</script>

<template>
  <ark.div v-bind="checkbox.indicatorProps" :hidden="!isHidden" :as-child="asChild">
    <slot />
  </ark.div>
</template>
