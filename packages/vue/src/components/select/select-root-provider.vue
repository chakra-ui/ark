<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { UseSelectReturn } from './use-select'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseSelectReturn<T>>
}

export interface SelectRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>,
    RenderStrategyProps,
    PolymorphicProps {}
export interface SelectRootProviderProps<T extends CollectionItem>
  extends SelectRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { SelectProvider } from './use-select-context'

const props = defineProps<SelectRootProviderProps<T>>()
const select = computed(() => props.value)

SelectProvider(select)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="select.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
