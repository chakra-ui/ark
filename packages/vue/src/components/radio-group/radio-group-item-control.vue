<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

defineProps<RadioGroupItemControlProps>()

const attrs = useAttrs()
const radioGroup = useRadioGroupContext()
const itemProps = useRadioGroupItemPropsContext()

const controlProps = computed(() => ({
  ...attrs,
  ...radioGroup.value.getItemControlProps(itemProps),
}))
</script>

<template>
  <ark.div v-bind="controlProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="radioGroup.getItemHiddenInputProps(itemProps)" />
</template>
