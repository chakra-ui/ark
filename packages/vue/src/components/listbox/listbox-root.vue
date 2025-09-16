<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Assign, BooleanDefaults } from '../../types'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './listbox.types'

export interface ListboxRootBaseProps<T extends CollectionItem> extends RootProps<T>, PolymorphicProps {}
export interface ListboxRootProps<T extends CollectionItem>
  extends ListboxRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export type ListboxRootComponent<P = {}> = <T extends CollectionItem>(props: Assign<ListboxRootProps<T>, P>) => any
export type { RootEmits as ListboxRootEmits } from './listbox.types'
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useListbox } from './use-listbox'
import { ListboxProvider } from './use-listbox-context'

const props = withDefaults(defineProps<ListboxRootBaseProps<T>>(), {
  deselectable: undefined,
  disabled: undefined,
  disallowSelectAll: undefined,
  loopFocus: undefined,
  selectOnHighlight: undefined,
  typeahead: undefined,
} satisfies BooleanDefaults<RootProps<T>>)

const emits = defineEmits<RootEmits<T>>()

const listbox = useListbox(props, emits)
ListboxProvider(listbox)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
