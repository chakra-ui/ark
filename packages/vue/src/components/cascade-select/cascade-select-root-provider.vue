<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { Assign } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'
import type { UseCascadeSelectReturn } from './use-cascade-select'

interface RootProviderProps {
  value: UnwrapRef<UseCascadeSelectReturn>
}

export interface CascadeSelectRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface CascadeSelectRootProviderProps
  extends
    CascadeSelectRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type CascadeSelectRootProviderComponent<P = {}> = (props: Assign<CascadeSelectRootProviderProps, P>) => any

export interface CascadeSelectRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { CascadeSelectProvider } from './use-cascade-select-context'

const props = defineProps<CascadeSelectRootProviderProps>()
const emits = defineEmits<CascadeSelectRootProviderEmits>()

const cascadeSelect = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: cascadeSelect.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

CascadeSelectProvider(cascadeSelect)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
