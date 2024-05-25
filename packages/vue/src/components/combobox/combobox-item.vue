<script lang="ts">
import type { ItemProps } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemProps
  extends PolymorphicProps,
    ItemProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed } from 'vue'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemProvider } from './use-combobox-item-context'
import { ComboboxItemPropsProvider } from './use-combobox-item-props-context'

const props = defineProps<ComboboxItemProps>()
const combobox = useComboboxContext()
ComboboxItemPropsProvider(props)
ComboboxItemProvider(computed(() => combobox.value.getItemState(props)))
</script>

<template>
  <ark.div v-bind="combobox.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
