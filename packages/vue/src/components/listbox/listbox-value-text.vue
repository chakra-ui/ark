<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ListboxValueTextProps>()
const listbox = useListboxContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="listbox.getValueTextProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>{{ slots.default?.() || listbox.valueAsString || props.placeholder }}</slot>
    </template>
  </ark.span>
</template>
