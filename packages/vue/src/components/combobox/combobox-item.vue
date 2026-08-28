<script lang="ts">
import type { ItemProps } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ComboboxItemProps
  extends
    ComboboxItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { computed } from 'vue'
import { useComboboxContext } from './use-combobox-context.ts'
import { ComboboxItemProvider } from './use-combobox-item-context.ts'
import { ComboboxItemPropsProvider } from './use-combobox-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ComboboxItemProps>()
const combobox = useComboboxContext()
ComboboxItemPropsProvider(props)
ComboboxItemProvider(computed(() => combobox.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
