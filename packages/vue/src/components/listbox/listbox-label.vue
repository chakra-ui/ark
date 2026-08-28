<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxLabelBaseProps extends PolymorphicProps {}
export interface ListboxLabelProps
  extends
    ListboxLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'

defineProps<ListboxLabelProps>()
const listbox = useListboxContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="listbox.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
