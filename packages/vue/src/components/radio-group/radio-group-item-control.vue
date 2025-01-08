<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemControlBaseProps extends PolymorphicProps {}
export interface RadioGroupItemControlProps
  extends RadioGroupItemControlBaseProps,
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
