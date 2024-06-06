<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupIndicatorProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

defineProps<RadioGroupIndicatorProps>()
const radioGroup = useRadioGroupContext()
</script>

<template>
  <ark.div v-bind="radioGroup.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
