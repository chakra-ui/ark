<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { UseListboxReturn } from './use-listbox'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseListboxReturn<T>>
}

export interface ListboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>,
    PolymorphicProps {}
export interface ListboxRootProviderProps<T extends CollectionItem>
  extends ListboxRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { ListboxProvider } from './use-listbox-context'

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
