<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectValueTextBaseProps extends PolymorphicProps {}
export interface SelectValueTextProps
  extends SelectValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  placeholder?: string
}
</script>

<script setup lang="ts">
import { useSlots } from 'vue'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

const props = defineProps<SelectValueTextProps>()
const select = useSelectContext()
const slots = useSlots()
</script>

<template>
  <ark.span v-bind="select.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || select.valueAsString || props.placeholder }}</slot>
  </ark.span>
</template>
