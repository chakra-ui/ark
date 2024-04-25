<script lang="ts">
import type { ItemProps } from '@zag-js/radio-group'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemProps extends PolymorphicProps, ItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed } from 'vue'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemProvider } from './use-radio-group-item-context'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context'

const props = defineProps<RadioGroupItemProps>()
const radioGroup = useRadioGroupContext()

RadioGroupItemPropsProvider(props)
RadioGroupItemProvider(computed(() => radioGroup.value.getItemState(props)))
</script>

<template>
  <ark.div v-bind="radioGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
