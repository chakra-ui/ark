<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupLabelProps
  extends PolymorphicProps,
    /* @vue-ignore */ LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

defineProps<RadioGroupLabelProps>()
const radioGroup = useRadioGroupContext()
</script>

<template>
  <ark.label v-bind="radioGroup.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
