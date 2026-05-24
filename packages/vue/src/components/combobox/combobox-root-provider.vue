<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { Assign } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { UseComboboxReturn } from './use-combobox.ts'
import type { RootEmits as PresenceEmits } from '../presence/presence.types.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseComboboxReturn<T>>
}

export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, RenderStrategyProps, PolymorphicProps {}
export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends
    ComboboxRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type ComboboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<ComboboxRootProviderProps<T>, P>,
) => any

export interface ComboboxRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { ComboboxProvider } from './use-combobox-context.ts'

const props = defineProps<ComboboxRootProviderProps<T>>()
const emits = defineEmits<ComboboxRootProviderEmits>()

const combobox = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: combobox.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

ComboboxProvider(combobox)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
