<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxLabelBaseProps extends PolymorphicProps {}
export interface CheckboxLabelProps
  extends CheckboxLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'
import { useForwardExpose } from '../../utils'

defineProps<CheckboxLabelProps>()
const checkbox = useCheckboxContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="checkbox.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
