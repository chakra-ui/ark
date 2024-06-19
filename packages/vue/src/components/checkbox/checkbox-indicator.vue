<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxIndicatorBaseProps extends PolymorphicProps {}
export interface CheckboxIndicatorProps
  extends CheckboxIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
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
  <ark.div v-bind="checkbox.getIndicatorProps()" :hidden="!isHidden" :as-child="asChild">
    <slot />
  </ark.div>
</template>
