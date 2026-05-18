<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RadioGroupItemControlBaseProps extends PolymorphicProps {}
export interface RadioGroupItemControlProps
  extends
    RadioGroupItemControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RadioGroupItemControlProps>()

const radioGroup = useRadioGroupContext()
const itemProps = useRadioGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="radioGroup.getItemControlProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
