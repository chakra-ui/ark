<script lang="ts">
import type { RootEmits, RootProps } from './radio-group.types'

export interface RadioGroupRootProps extends RootProps, PolymorphicProps {}
export interface RadioGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useRadioGroup } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: undefined,
  readOnly: undefined,
})
const emits = defineEmits<RadioGroupRootEmits>()

const radioGroup = useRadioGroup(props, emits)
RadioGroupProvider(radioGroup)
</script>

<template>
  <ark.div v-bind="radioGroup.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
