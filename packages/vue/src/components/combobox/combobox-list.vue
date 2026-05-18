<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxListBaseProps extends PolymorphicProps {}
export interface ComboboxListProps
  extends
    ComboboxListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxListProps>()
const combobox = useComboboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
