<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { UseComboboxReturn } from './use-combobox'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseComboboxReturn<T>>
}

export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>,
    RenderStrategyProps,
    PolymorphicProps {}
export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends ComboboxRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { ComboboxProvider } from './use-combobox-context'

const props = defineProps<ComboboxRootProviderProps<T>>()
const combobox = computed(() => props.value)

ComboboxProvider(combobox)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
