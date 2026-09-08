<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectValueTextBaseProps extends PolymorphicProps {}
export interface SelectValueTextProps
  extends
    SelectValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  placeholder?: string
}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SelectValueTextProps>()
const select = useSelectContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="select.getValueTextProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>{{ slots.default?.() || select.valueAsString || props.placeholder }}</slot>
    </template>
  </ark.span>
</template>
