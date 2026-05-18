<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { Assign } from '../../types.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { UseListboxReturn } from './use-listbox.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseListboxReturn<T>>
}

export interface ListboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps {}
export interface ListboxRootProviderProps<T extends CollectionItem>
  extends
    ListboxRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type ListboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<ListboxRootProviderProps<T>, P>,
) => any
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { ListboxProvider } from './use-listbox-context.ts'

const props = defineProps<ListboxRootProviderProps<T>>()
const listbox = computed(() => props.value)

ListboxProvider(listbox)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
