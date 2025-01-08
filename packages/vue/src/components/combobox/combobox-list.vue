<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxListBaseProps extends PolymorphicProps {}
export interface ComboboxListProps
  extends ComboboxListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxListProps>()
const combobox = useComboboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
