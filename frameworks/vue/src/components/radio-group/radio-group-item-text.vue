<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

defineProps<RadioGroupItemTextProps>()
const radioGroup = useRadioGroupContext()
const itemProps = useRadioGroupItemPropsContext()
</script>

<template>
  <ark.span v-bind="radioGroup.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
