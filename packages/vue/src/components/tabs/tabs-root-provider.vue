<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseTabsReturn } from './use-tabs'

interface RootProviderProps {
  value: UnwrapRef<UseTabsReturn>
}

export interface TabsRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface TabsRootProviderProps
  extends TabsRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { TabsProvider } from './use-tabs-context'

const props = defineProps<TabsRootProviderProps>()
const tabs = computed(() => props.value)

TabsProvider(tabs)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tabs.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
