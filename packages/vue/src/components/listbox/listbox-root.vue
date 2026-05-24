<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Assign, BooleanDefaults } from '../../types.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './listbox.types.ts'

export interface ListboxRootBaseProps<T extends CollectionItem> extends RootProps<T>, PolymorphicProps {}
export interface ListboxRootProps<T extends CollectionItem>
  extends
    ListboxRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type ListboxRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  ListboxRootProps<T>,
  P
>

export type ListboxRootComponent<P = {}> = <T extends CollectionItem>(props: ListboxRootComponentProps<T, P>) => any

export type { RootEmits as ListboxRootEmits } from './listbox.types.ts'
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useListbox } from './use-listbox.ts'
import { ListboxProvider } from './use-listbox-context.ts'

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
