<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RadioGroupIndicatorBaseProps extends PolymorphicProps {}
export interface RadioGroupIndicatorProps
  extends
    RadioGroupIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RadioGroupIndicatorProps>()
const radioGroup = useRadioGroupContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="radioGroup.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
