<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectValueTextBaseProps extends PolymorphicProps {
  placeholder?: string
}
export interface CascadeSelectValueTextProps
  extends
    CascadeSelectValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

const props = defineProps<CascadeSelectValueTextProps>()
const cascadeSelect = useCascadeSelectContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="cascadeSelect.getValueTextProps()" :as-child="asChild">
    <slot>{{ cascadeSelect.empty ? props.placeholder : cascadeSelect.valueAsString }}</slot>
  </ark.span>
</template>
