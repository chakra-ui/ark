<script lang="ts">
import type { ItemProps } from '@zag-js/listbox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ListboxItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ListboxItemProps
  extends
    ListboxItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { ListboxItemProvider } from './use-listbox-item-context'
import { ListboxItemPropsProvider } from './use-listbox-item-props-context'

const props = defineProps<ListboxItemProps>()
const listbox = useListboxContext()

ListboxItemPropsProvider(props)
ListboxItemProvider(computed(() => listbox.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
