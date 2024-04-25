<script lang="ts">
import type { RenderStrategyProps } from '../../utils/render-strategy'
import type { RootEmits, RootProps } from './tabs.types'

export interface TabsRootProps extends RootProps, RenderStrategyProps, PolimoprhicProps {}
export interface TabsRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyProvider } from '../../utils/use-render-strategy'
import { ark, type PolimoprhicProps } from '../factory'
import { useTabs } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

const props = withDefaults(defineProps<TabsRootProps>(), { loopFocus: true })
const emits = defineEmits<TabsRootEmits>()

const tabs = useTabs(props, emits)

TabsProvider(tabs)
RenderStrategyProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="tabs.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
