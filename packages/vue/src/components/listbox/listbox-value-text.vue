<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ListboxValueTextBaseProps extends PolymorphicProps {}
export interface ListboxValueTextProps
  extends
    ListboxValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  placeholder?: string
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<ListboxValueTextProps>()
const listbox = useListboxContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="listbox.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || listbox.valueAsString || props.placeholder }}</slot>
  </ark.span>
</template>
