<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { Assign } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { UseSelectReturn } from './use-select'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseSelectReturn<T>>
}

export interface SelectRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, RenderStrategyProps, PolymorphicProps {}
export interface SelectRootProviderProps<T extends CollectionItem>
  extends
    SelectRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type SelectRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<SelectRootProviderProps<T>, P>,
) => any

export interface SelectRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { SelectProvider } from './use-select-context'

const props = defineProps<SelectRootProviderProps<T>>()
const emits = defineEmits<SelectRootProviderEmits>()

const select = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: select.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

SelectProvider(select)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
