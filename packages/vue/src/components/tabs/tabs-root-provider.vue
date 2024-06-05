<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseTabsReturn } from './use-tabs'

interface RootProviderProps {
  value: UnwrapRef<UseTabsReturn>
}

export interface TabsRootProviderProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { TabsProvider } from './use-tabs-context'

const props = defineProps<TabsRootProviderProps>()
const tabs = computed(() => props.value)

TabsProvider(tabs)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="tabs.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
