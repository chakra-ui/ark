<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemTextBaseProps extends PolymorphicProps {}
export interface RadioGroupItemTextProps
  extends RadioGroupItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'
import { useForwardExpose } from '../../utils'

defineProps<RadioGroupItemTextProps>()
const radioGroup = useRadioGroupContext()
const itemProps = useRadioGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="radioGroup.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
