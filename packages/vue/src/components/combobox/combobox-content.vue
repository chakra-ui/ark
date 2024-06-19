<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxContentBaseProps extends PolymorphicProps {}
export interface ComboboxContentProps
  extends ComboboxContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxContentProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.div v-bind="combobox.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
